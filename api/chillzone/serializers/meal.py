from rest_framework import serializers
from chillzone.models import Meal
from chillzone.serializers import TagSerializer

class MealSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.label')  # Afficher le nom de la catégorie
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Meal
        fields = ['id', 'name', 'description', 'photo_link', 'price', 'stock', 'category', 'tags']

    def get_tags(self, obj):
        return TagSerializer(obj.tag.all(), many=True).data