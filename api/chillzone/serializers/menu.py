from rest_framework import serializers
from chillzone.models import Menu

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['pk', 'name', 'description', 'photo_link', 'price', 'restaurant']