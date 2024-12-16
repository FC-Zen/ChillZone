from rest_framework import serializers
from chillzone.models import Tagging

class TaggingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tagging
        fields = ['meal', 'tag']