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
    
class CreateMenuSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255, required=True)
    description = serializers.CharField(required=True)
    price = serializers.FloatField(required=True)
    photo_link = serializers.ImageField(required=False, allow_null=True)
    
    starter = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )
    main = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )
    drink = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )
    dessert = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )
    side = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )
    other = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )

    def create(self, validated_data):
        """
        Crée un nouveau menu en liant les catégories associées.
        """
        category_fields = ["starter", "main", "drink", "dessert", "side", "other"]
        categories_data = {field: validated_data.pop(field, []) for field in category_fields}

        menu = Menu.objects.create(**validated_data)

        for field in category_fields:
            try:
                type_obj = Type.objects.get(label=field)
            except Type.DoesNotExist:
                continue

            for category_id in categories_data[field]:
                try:
                    category_obj = Category.objects.get(id=category_id)
                    Associate.objects.create(
                        menu=menu,
                        type=type_obj,
                        category=category_obj
                    )
                except Category.DoesNotExist:
                    pass 

        return menu
    
class UpdateMenuSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    name = serializers.CharField(required=False, max_length=255)
    description = serializers.CharField(required=False)
    photo_link = serializers.ImageField(required=False, allow_null=True)
    price = serializers.FloatField(required=False)
    
    starter = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )
    main = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )
    drink = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )
    dessert = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )
    side = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )
    other = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )
    