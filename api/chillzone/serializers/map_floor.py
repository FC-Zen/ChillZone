from rest_framework import serializers
from chillzone.models import MapFloor

class MapFloorSerializer(serializers.ModelSerializer) :
    class Meta:
        model = MapFloor
        fields = ['pk', 'number', 'name', 'photo_link']

class AdminMapFloorSerializer(serializers.ModelSerializer):
    floor_id = serializers.IntegerField(source='id')

    class Meta:
        model = MapFloor
        fields = ['floor_id', 'number', 'name', 'photo_link']