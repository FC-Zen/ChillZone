from rest_framework import serializers
from chillzone.models import Meal, Tag, Category
from chillzone.serializers import TagSerializer

class MealSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.label')  # Afficher le nom de la catégorie
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Meal
        fields = ['id', 'name', 'description', 'photo_link', 'price', 'stock', 'category', 'tags']

    def get_tags(self, obj):
        return TagSerializer(obj.tag.all(), many=True).data
    
class CreateMealSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    description = serializers.CharField()
    photo_link = serializers.ImageField(required=False, allow_null=True)
    price = serializers.FloatField()
    stock = serializers.IntegerField()
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    tags = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )

    def create(self, validated_data):
        tags_ids = validated_data.pop('tags', [])
        meal = Meal.objects.create(**validated_data)
        if tags_ids:
            meal.tag.set(Tag.objects.filter(id__in=tags_ids))
        return meal
    
class UpdateMealSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    name = serializers.CharField(required=False, max_length=255)
    description = serializers.CharField(required=False)
    photo_link = serializers.ImageField(required=False, allow_null=True)
    price = serializers.FloatField(required=False)
    stock = serializers.IntegerField(required=False)
    category = serializers.IntegerField(required=False)
    tags = serializers.ListField(
        child=serializers.IntegerField(allow_null=True, required=False), required=False, allow_empty=True
    )

    def validate_category(self, value):
        if not Category.objects.filter(id=value).exists():
            raise serializers.ValidationError("Category does not exist.")
        return value
    
    def validate_tags(self, value):
        existing_tags = Tag.objects.filter(id__in=value).values_list("id", flat=True)
        invalid_tags = set(value) - set(existing_tags)
        if invalid_tags:
            raise serializers.ValidationError(f"Invalid tag IDs: {list(invalid_tags)}")
        return value
