from rest_framework import serializers
from chillzone.models import LineContent

class LineContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LineContent
        fields = ['menu', 'meal', 'line']