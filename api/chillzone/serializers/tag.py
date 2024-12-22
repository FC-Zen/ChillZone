from rest_framework import serializers
from chillzone.models import Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['pk', 'label', 'description', 'tag_category']