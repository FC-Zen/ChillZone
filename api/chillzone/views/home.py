from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.timezone import now
from chillzone.models import LocationReservation, RestaurationPlace
from chillzone.serializers import ReservationSerializer, OpenRestaurantSerializer

class UserDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        establishment = user.usermeta.establishment

        next_reservation = LocationReservation.objects.filter(
            reservation__user=user,
            reservation__status__in=['Confirmed', 'Ongoing'],
            day_reservation__gte=now().date()
        ).order_by('day_reservation', 'start_time').first()

        next_reservation_data = ReservationSerializer(next_reservation).data if next_reservation else None

        open_restaurants = RestaurationPlace.objects.filter(
            linkto__establishment=establishment,
            linkto__status=True,
            status=True,
            is_valid=True
        )
        open_restaurants_data = OpenRestaurantSerializer(open_restaurants, many=True).data

        return Response({
            "next_reservation": next_reservation_data,
            "open_restaurants": open_restaurants_data
        })