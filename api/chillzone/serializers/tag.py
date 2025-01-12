from rest_framework import serializers
from chillzone.models import Tag

class AdminAvailableTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'libelle']