from rest_framework import serializers
from chillzone.models import MapFloor

class MapFloorSerializer(serializers.ModelSerializer) :
    class Meta:
        model = MapFloor
        fields = ['pk', 'number', 'name', 'photo_link']

class AdminMapFloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapFloor
        fields = ['id', 'number', 'name', 'photo_link']