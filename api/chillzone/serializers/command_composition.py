from rest_framework import serializers
from chillzone.models import CommandComposition

class CommandCompositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommandComposition
        unique_together = ("command", "line")
        fields = ['command', 'line']