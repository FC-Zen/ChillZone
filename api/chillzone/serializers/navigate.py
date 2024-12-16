from rest_framework import serializers
from chillzone.models import Navigate
from django.db import models

class NavigateSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Navigate
        constraints = [
            models.UniqueConstraint(
                fields=["location_start", "location_end"], name='unique_locationStart_locationEnd'
            )
        ]
        fields = ['location_start', 'location_end', 'link_photo', 'position_x_photo']