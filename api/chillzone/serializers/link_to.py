from rest_framework import serializers
from chillzone.models import LinkTo

class LinkToSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkTo
        unique_together = ('establishment', 'restaurant')
        fields = ['establishment', 'restaurant']