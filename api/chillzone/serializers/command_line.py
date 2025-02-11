from rest_framework import serializers
from chillzone.models import CommandLine
from chillzone.serializers import LineContentSerializer

class CommandLineSerializer(serializers.ModelSerializer):
    line_content = LineContentSerializer(source='linecontent_set', many=True)
    
    class Meta:
        model = CommandLine
        fields = ['quantity', 'line_content']