from rest_framework import serializers
from chillzone.models import Map

class MapSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Map
        fields = ['pk', 'name', 'creation_date', 'modification_date']