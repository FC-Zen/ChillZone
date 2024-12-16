from rest_framework import serializers
from chillzone.models import IsLocated

class IsLocatedSerializer(serializers.ModelSerializer) :
    class Meta:
        model = IsLocated
        fields = ['establishment', 'location']