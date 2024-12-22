from rest_framework import serializers
from chillzone.models import LinkTo

class LinkToSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkTo
        fields = ['establishment', 'restaurant', 'status']