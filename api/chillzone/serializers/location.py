from rest_framework import serializers
from chillzone.models import Location, MapFloor, IsLocated, Tag

class LocationSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Location
        fields = ['pk', 'name', 'photo_link', 'description', 'capacity', 'status', 'position_x', 'position_y']

class AdminLocationSerializer(serializers.ModelSerializer):
    floor_name = serializers.CharField(source='id_floor.name', read_only=True)
    room_type = serializers.CharField(source='id_type.label', read_only=True)

    class Meta:
        model = Location
        fields = ['id', 'name', 'description', 'capacity', 'floor_name', 'status', 'photo_link', 'room_type', 'position_x', 'position_y']

class AdminAvailableFloorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapFloor
        fields = ['id', 'name']

class AdminFloorsWithPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapFloor
        fields = ['id', 'number', 'name', 'photo_link']

class AdminCreateLocationSerializer(serializers.ModelSerializer):
        class Meta:
            model = Location
            fields = ['id', 'name', 'photo_link', 'description', 'capacity', 'position_x', 'position_y', 'id_type', 'id_floor']
