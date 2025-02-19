from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.timezone import now
from chillzone.models import Reservation, LocationReservation
from chillzone.serializers import ReservationSerializer

class ClientReservationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        today = now().date()

        reservation_id = request.query_params.get('id')

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


    def delete(self, request, *args, **kwargs):
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