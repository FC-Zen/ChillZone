from rest_framework import serializers
from chillzone.models import LineContent
from django.db import models

class LineContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LineContent
        constraints = [
            models.UniqueConstraint(
                fields=['menu', 'meal', 'line'], name='unique_menu_meal_line'
            )
        ]
        fields = ['menu', 'meal', 'line']