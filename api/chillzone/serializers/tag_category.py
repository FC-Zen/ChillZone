from rest_framework import serializers
from chillzone.models import TagCategory

class TagCategorySerializer(serializers.ModelSerializer) :
    class Meta:
        model = TagCategory
        fields = ['pk', 'type', 'link_network']