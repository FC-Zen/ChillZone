from rest_framework import serializers
from chillzone.models import Conflict
from django.db import models

class ConflictSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Conflict
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'reservation'], name='unique_user_reservation'
            )
        ]
        fields = ['user', 'reservation', 'comment']