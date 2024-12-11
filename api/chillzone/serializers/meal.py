from rest_framework import serializers
from chillzone.models import Meal

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ['pk', 'name', 'description', 'type', 'photo_link', 'price', 'stock', 'modification_date', 'creation_date', 'restaurant', 'category']
