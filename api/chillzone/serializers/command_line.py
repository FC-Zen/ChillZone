from rest_framework import serializers
from chillzone.models import CommandLine

class CommandLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommandLine
        fields = ['pk', 'quantity']