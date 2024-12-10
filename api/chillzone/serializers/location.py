from rest_framework import serializers
from chillzone.models import Location

class LocationSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Location
        fields = ['pk', 'name', 'photo_link', 'description', 'capacity', 'status', 'position_x', 'position_y', 'creation_date', 'modification_date']