from rest_framework import serializers
from chillzone.models import LocationReservation

class ReservationSerializer(serializers.ModelSerializer):
    reservation_id = serializers.IntegerField(source='reservation.id')
    location_name = serializers.CharField(source='location.name')
    position_x = serializers.IntegerField(source='location.position_x')
    position_y = serializers.IntegerField(source='location.position_y')
    floor_name = serializers.CharField(source='location.id_floor.name')
    photo_link = serializers.CharField(source='location.id_floor.photo_link')
    establishment_name = serializers.CharField(source='location.id_floor.map.establishment.name')

    class Meta:
        model = LocationReservation
        fields = [
            'reservation_id', 'reservation__status', 'start_time', 'end_time', 'day_reservation',
            'location_name', 'position_x', 'position_y', 'floor_name', 'photo_link', 'establishment_name'
        ]