from rest_framework import serializers
from chillzone.models import Menu, Associate, Type, Category
from collections import defaultdict

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'label']

class TypeWithCategoriesSerializer(serializers.Serializer):
    type_label = serializers.CharField(source='type.label')
    categories = CategorySerializer(many=True)

class MenuWithOptionsSerializer(serializers.ModelSerializer):
    types = serializers.SerializerMethodField()

    class Meta:
        model = Menu
        fields = ['id', 'name', 'description', 'photo_link', 'price', 'types']

    def get_types(self, obj):
        type_dict = defaultdict(set)

        types = Type.objects.filter(menu=obj)

        for t in types:
            categories = Category.objects.filter(associate__menu=obj, associate__type=t)
            for category in categories:
                type_dict[t.label].add((category.id, category.label))

        result = {
            type_label: [{"id": cat_id, "label": cat_label} for cat_id, cat_label in sorted(categories)]
            for type_label, categories in type_dict.items()
        }

        return result