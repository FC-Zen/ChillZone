from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission

from django.utils.timezone import now
from django.utils.timezone import make_aware
from django.db import transaction

from datetime import datetime, timedelta

from chillzone.models import Reservation, LocationReservation, Location, Tag, Event, Calendar
from chillzone.serializers import ReservationSerializer, FilterReservationSerializer, CreateReservationSerializer

class IsNotBlock(BasePermission):
    """
    Custom permission to grant access only to users marked as 'is_block'.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user, 'usermeta') and not request.user.usermeta.is_block

class ReservationView(APIView):
    permission_classes = [IsAuthenticated, IsNotBlock]
    serializer_class = FilterReservationSerializer

    def get(self, request):
        room_types = Tag.objects.filter(id_tag_category__label="Location").values_list('label', flat=True)  
        duration_options = {
            "Short": "30min",
            "Standard": "1h",
            "Extended": "2h"
        }
        return Response({"room_types": list(room_types), "duration_options": duration_options}, status=status.HTTP_200_OK)

    def put(self, request):
        serializer = FilterReservationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        date = serializer.validated_data['date']
        duration = serializer.validated_data['duration']
        types = serializer.validated_data['type']

        opening_time = make_aware(datetime.combine(date, datetime.min.time()) + timedelta(hours=8))
        closing_time = make_aware(datetime.combine(date, datetime.min.time()) + timedelta(hours=18))

        locations = Location.objects.filter(id_type__label__in=types, status=True)

        available_locations = []
        for location in locations:
            reservations = LocationReservation.objects.filter(
                location=location,
                day_reservation=date
            ).exclude(reservation__status='Cancelled')

            booked_intervals = [
                (
                    make_aware(datetime.combine(date, res.start_time)), 
                    make_aware(datetime.combine(date, res.end_time))
                ) 
                for res in reservations
            ]

            available_intervals = []

            current_time = opening_time
            while current_time + duration <= closing_time:
                next_time = current_time + duration
                if not any(start <= current_time < end or start < next_time <= end for start, end in booked_intervals):
                    available_intervals.append((current_time.time(), next_time.time()))
                current_time += timedelta(minutes=30)

            if available_intervals:
                available_locations.append({
                    'id': location.id,
                    'name': location.name,
                    'floor': location.id_floor.name,
                    'establishment': location.id_floor.map.establishment.name,
                    'photo': location.photo_link.url,
                    'capacity': location.capacity,
                    'available_slots': available_intervals
                })

        return Response(available_locations, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = CreateReservationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        location_id = serializer.validated_data['location_id']
        start_time = serializer.validated_data['start_time']
        duration = serializer.validated_data['duration']
        day_reservation = serializer.validated_data['day_reservation']

        try:
            location = Location.objects.get(id=location_id, status=True)
        except Location.DoesNotExist:
            return Response({"location_id": "Location not found or unavailable."}, status=status.HTTP_404_NOT_FOUND)
        
        start_datetime = datetime.combine(day_reservation, start_time)
        end_datetime = start_datetime + timedelta(minutes=duration)

        end_time = (datetime.combine(datetime.today(), start_time) + timedelta(minutes=duration)).time()

        existing_reservations = LocationReservation.objects.filter(
            location=location,
            day_reservation=day_reservation,
            start_time__lt=end_time,
            end_time__gt=start_time
        ).exclude(reservation__status='Cancelled')

        if existing_reservations.exists():
            return Response({"error": "This time slot is already booked."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            calendar = Calendar.objects.get(user=request.user)
        except Calendar.DoesNotExist:
            return Response({"error": "Calendar not found"}, status=status.HTTP_404_NOT_FOUND)

        with transaction.atomic():
            reservation = Reservation.objects.create(
                user=request.user,
                status='Confirmed'
            )

            LocationReservation.objects.create(
                reservation=reservation,
                location=location,
                start_time=start_time,
                end_time=end_time,
                day_reservation=day_reservation
            )



            Event.objects.create(
                id=f"RES{request.user.id}{location.id}{start_time.strftime('%H%M')}{end_datetime.strftime('%H%M')}",
                title='Réservation de ' + location.name,
                start_time=start_datetime,
                end_time=end_datetime,
                location=location.name,
                description='Réservation de ' + location.name + ' situé au ' + location.id_floor.name,
                calendar=calendar
            )

        return Response({"message": "Reservation created successfully."}, status=status.HTTP_201_CREATED)


        

class ClientReservationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        today = now().date()

        reservation_id = request.data.get('id')

        if reservation_id:
            try:
                reservation = LocationReservation.objects.get(reservation__id=reservation_id, reservation__user=user)
            except LocationReservation.DoesNotExist:
                return Response({"error": "Reservation not found or does not belong to you."}, status=status.HTTP_404_NOT_FOUND)

            reservation_data = ReservationSerializer(reservation).data
            return Response(reservation_data, status=status.HTTP_200_OK)

        else:
            past_reservations = LocationReservation.objects.filter(
                reservation__user=user,
                day_reservation__lt=today
            ).order_by('-day_reservation', '-start_time')

            today_reservations = LocationReservation.objects.filter(
                reservation__user=user,
                day_reservation=today
            ).order_by('start_time')

            upcoming_reservations = LocationReservation.objects.filter(
                reservation__user=user,
                day_reservation__gt=today
            ).order_by('day_reservation', 'start_time')

            past_data = ReservationSerializer(past_reservations, many=True).data
            today_data = ReservationSerializer(today_reservations, many=True).data
            upcoming_data = ReservationSerializer(upcoming_reservations, many=True).data

            return Response({
                "past_reservations": past_data,
                "today_reservations": today_data,
                "upcoming_reservations": upcoming_data
            }, status=status.HTTP_200_OK)
        
    def put(self, request):
        reservation_id = request.data.get('id')

        if not reservation_id:
            return Response({"error": "Reservation ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            reservation = Reservation.objects.get(id=reservation_id, user=request.user)
        except Reservation.DoesNotExist:
            return Response({"error": "Reservation not found or does not belong to you."}, status=status.HTTP_404_NOT_FOUND)

        if reservation.status == 'Ongoing':
            return Response({"message": "Reservation is already ongoing."}, status=status.HTTP_200_OK)

        reservation.status = 'Ongoing'
        reservation.save()

        return Response({"message": "Reservation has been successfully ongoing."}, status=status.HTTP_200_OK)
        
    def put(self, request):
        reservation_id = request.data.get('id')

        if not reservation_id:
            return Response({"error": "Reservation ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            reservation = Reservation.objects.get(id=reservation_id, user=request.user)
        except Reservation.DoesNotExist:
            return Response({"error": "Reservation not found or does not belong to you."}, status=status.HTTP_404_NOT_FOUND)

        if reservation.status == 'Finished':
            return Response({"message": "Reservation is already finished."}, status=status.HTTP_200_OK)

        reservation.status = 'Finished'
        reservation.save()

        return Response({"message": "Reservation has been successfully cancelled."}, status=status.HTTP_200_OK)

    def delete(self, request):
        reservation_id = request.data.get('id')

        if not reservation_id:
            return Response({"error": "Reservation ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            reservation = Reservation.objects.get(id=reservation_id, user=request.user)
        except Reservation.DoesNotExist:
            return Response({"error": "Reservation not found or does not belong to you."}, status=status.HTTP_404_NOT_FOUND)

        if reservation.status == 'Cancelled':
            return Response({"message": "Reservation is already cancelled."}, status=status.HTTP_200_OK)

        reservation.status = 'Cancelled'
        reservation.save()

        return Response({"message": "Reservation has been successfully cancelled."}, status=status.HTTP_200_OK)