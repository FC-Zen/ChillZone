from rest_framework import serializers
from chillzone.models import LocationReservation
from django.db import models

class LocationReservationSerializer(serializers.ModelSerializer) :
    class Meta:
        model = LocationReservation
        constraints = [
            models.UniqueConstraint(
                fields=['reservation', 'location'], name='unique_rervation_location'
            )
        ]
        fields = ['reservation', 'location', 'start_time', 'end_time', 'day_reservation']