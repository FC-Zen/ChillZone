from rest_framework import serializers
from chillzone.models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['pk', 'label', 'description']