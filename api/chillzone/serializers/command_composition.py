from rest_framework import serializers
from chillzone.models import CommandComposition
from django.db import models

class CommandCompositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommandComposition
        constraints = [
            models.UniqueConstraint(
                fields=['command', 'line'], name='unique_command_line'
            )
        ]
        fields = ['command', 'line']