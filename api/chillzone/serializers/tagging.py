from rest_framework import serializers
from chillzone.models import Tagging
from django.db import models

class TaggingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tagging
        constraints = [
            models.UniqueConstraint(
                fields=['meal', 'tag'], name='unique_meal_tag'
            )
        ]
        fields = ['meal', 'tag']