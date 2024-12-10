from rest_framework import serializers
from chillzone.models import MapFloor

class MapSerializer(serializers.ModelSerializer) :
    class Meta:
        model = MapFloor
        fields = ['pk', 'number', 'name', 'photo_link', 'creation_date', 'modification_date']