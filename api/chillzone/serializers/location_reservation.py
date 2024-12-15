from rest_framework import serializers
from chillzone.models import LocationReservation

class LocationReservationSerializer(serializers.ModelSerializer) :
    class Meta:
        model = LocationReservation
        unique_together = ('reservation', 'location')
        fields = ['reservation', 'location', 'start_time', 'end_time', 'day_reservation']