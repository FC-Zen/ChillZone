from rest_framework import serializers
from chillzone.models import WorkIn

class WorkInSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkIn
        unique_together = ('user', 'restaurant')
        fields = ['user', 'restaurant', 'role']