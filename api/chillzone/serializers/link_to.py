from rest_framework import serializers
from chillzone.models import LinkTo
from django.db import models

class LinkToSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkTo
        constraints = [
            models.UniqueConstraint(
                fields=['establishment', 'restaurant'], name='unique_establishment_restaurant'
            )
        ]
        fields = ['establishment', 'restaurant']