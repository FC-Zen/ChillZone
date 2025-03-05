from rest_framework import serializers
from chillzone.models import LocationReservation, Tag

class FilterReservationSerializer(serializers.Serializer):

    type = serializers.ListField(
        child=serializers.CharField(),
        allow_empty=False
    )
    date = serializers.DateField()

    duration = serializers.DurationField()

    def validate_type(self, value):
        valid_types = Tag.objects.filter(id_tag_category__label="Location").values_list('label', flat=True)
        if not all(t in valid_types for t in value):
            raise serializers.ValidationError("One or more types are invalid.")
        return value

class ReservationSerializer(serializers.ModelSerializer):

    reservation_id = serializers.IntegerField(source='reservation.id')

    reservation_status = serializers.CharField(source='reservation.status')

    location_name = serializers.CharField(source='location.name')

    position_x = serializers.IntegerField(source='location.position_x')

    position_y = serializers.IntegerField(source='location.position_y')

    floor_name = serializers.CharField(source='location.id_floor.name')

    photo_link = serializers.CharField(source='location.photo_link')

    establishment_name = serializers.CharField(source='location.id_floor.map.establishment.name')

    class Meta:
        model = LocationReservation
        fields = [
            'reservation_id', 'reservation_status', 'start_time', 'end_time', 'day_reservation',
            'location_name', 'position_x', 'position_y', 'floor_name', 'photo_link', 'establishment_name'
        ]

class CreateReservationSerializer(serializers.Serializer):
        
        location_id = serializers.IntegerField()

        start_time = serializers.TimeField()

        duration = serializers.IntegerField()
        
        day_reservation = serializers.DateField()