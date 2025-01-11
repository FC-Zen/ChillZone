from rest_framework import serializers
from chillzone.models import Location, MapFloor

class LocationSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Location
        fields = ['pk', 'name', 'photo_link', 'description', 'capacity', 'status', 'position_x', 'position_y']

class AdminLocationSerializer(serializers.ModelSerializer):
    floor_name = serializers.CharField(source='id_floor.name')
    establishment = serializers.CharField(source='islocated.establishment.name')
    available_floors = serializers.SerializerMethodField()

    class Meta:
        model = Location
        fields = ['id', 'name', 'description', 'capacity', 'floor_name', 'establishment', 'status', 'available_floors']

    def get_available_floors(self, obj):
        establishment = obj.islocated.establishment
        floors = MapFloor.objects.filter(map__establishment=establishment)
        return [{'id': floor.id, 'name': floor.name} for floor in floors]