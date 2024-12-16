from rest_framework import serializers
from chillzone.models import IsLocated
from django.db import models

class IsLocatedSerializer(serializers.ModelSerializer) :
    class Meta:
        model = IsLocated
        constraints = [
            models.UniqueConstraint(
                fields=['establishment', 'location'], name='unique_establishment_location'
            )
        ]
        fields = ['establishment', 'location']