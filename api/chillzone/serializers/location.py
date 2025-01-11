from rest_framework import serializers
from chillzone.models import Location, MapFloor, IsLocated

class LocationSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Location
        fields = ['pk', 'name', 'photo_link', 'description', 'capacity', 'status', 'position_x', 'position_y']

class AdminLocationSerializer(serializers.ModelSerializer):
    floor_name = serializers.CharField(source='id_floor.name', read_only=True)
    establishment = serializers.SerializerMethodField()

    class Meta:
        model = Location
        fields = ['id', 'name', 'description', 'capacity', 'floor_name', 'establishment', 'status']

    def get_establishment(self, obj):
        is_located = IsLocated.objects.filter(location=obj).first()
        return is_located.establishment.name if is_located else None

class AdminAvailableFloorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapFloor
        fields = ['id', 'name']
