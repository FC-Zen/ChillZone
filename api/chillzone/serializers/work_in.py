from rest_framework import serializers
from chillzone.models import WorkIn
from django.db import models

class WorkInSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkIn
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'restaurant'], name='unique_meal_tag'
            )
        ]
        fields = ['user', 'restaurant', 'role']