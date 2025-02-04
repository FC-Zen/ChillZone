from rest_framework import serializers
from chillzone.models import MapFloor, Location

class MapFloorSerializer(serializers.ModelSerializer) :
    class Meta:
        model = MapFloor
        fields = ['pk', 'number', 'name', 'photo_link']

class CreateMapFloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapFloor
        fields = ['number', 'name', 'photo_link']

class UpdateMapFloorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True)
    number = serializers.IntegerField(required=False)
    name = serializers.CharField(max_length=100, required=False)
    photo_link = serializers.ImageField(required=False, allow_null=True)

class AdminLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'description', 'capacity', 'status', 'photo_link', 'position_x', 'position_y']

class AdminMapFloorSerializer(serializers.ModelSerializer):
    locations = serializers.SerializerMethodField()

    class Meta:
        model = MapFloor
        fields = ['id', 'number', 'name', 'photo_link', 'locations']

    def get_locations(self, obj):
        locations = Location.objects.filter(id_floor=obj)
        return AdminLocationSerializer(locations, many=True).data