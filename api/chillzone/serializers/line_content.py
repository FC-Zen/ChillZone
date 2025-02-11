from rest_framework import serializers
from chillzone.models import LineContent
from chillzone.serializers import MealSerializer, MenuMealSerializer

class LineContentSerializer(serializers.ModelSerializer):
    meal = MealSerializer()
    menu = MenuMealSerializer()

    class Meta:
        model = LineContent
        fields = ['menu', 'meal']

