from rest_framework import serializers
from chillzone.models import Tagging

class TaggingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tagging
        unique_together = ('meal', 'tag')
        fields = ['meal', 'tag']