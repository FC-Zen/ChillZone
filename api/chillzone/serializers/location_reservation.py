from rest_framework import serializers
from chillzone.models import LocationReservation

class LocationReservationSerializer(serializers.ModelSerializer) :
    class Meta:
        model = LocationReservation
        fields = ['reservation', 'location', 'start_time', 'end_time', 'day_reservation']

class AdminLocationReservationSerializer(serializers.ModelSerializer):
    location_name = serializers.CharField(source='location.name')
    status = serializers.CharField(source='reservation.status')

    class Meta:
        model = LocationReservation
        fields = ['id', 'day_reservation', 'start_time', 'end_time', 'location_name', 'status']