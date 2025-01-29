from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from django.db.models import Count, Q, F
from django.utils.timezone import timedelta
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
from django.contrib.auth.models import User
from chillzone.models import RestaurationPlace, Menu, Meal, Type, Category, Associate, LineContent, Command, CommandLine, CommandComposition, WorkIn, Tag
from chillzone.serializers import MenuWithOptionsSerializer, TagSerializer, MealSerializer, CategorySerializer, CreateMealSerializer, UpdateMealSerializer

class IsOwner(BasePermission):
    """
    Custom permission to grant access only to users marked as 'is_owner'.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user, 'usermeta') and request.user.usermeta.is_owner
    
class OwnerMenuView(APIView):
    permission_classes = [IsAuthenticated & IsOwner]

    def get(self, request):
        user = request.user

        try:
            work_in = WorkIn.objects.get(user=user)
            restaurant = work_in.restaurant
        except WorkIn.DoesNotExist:
            return Response({"error": "You are not associated with any restaurant."}, status=status.HTTP_400_BAD_REQUEST)

        menus = Menu.objects.filter(restaurant=restaurant)
        
        serializer_menus = MenuWithOptionsSerializer(menus, many=True)
        
        categories = Category.objects.all().distinct()
        categories_serializer = CategorySerializer(categories, many=True)

        data = {
            "menus" : serializer_menus.data,
            "available_options" : categories_serializer.data
        }
        return Response(data, status=status.HTTP_200_OK)
    
class OwnerMealView(APIView):
    permission_classes = [IsAuthenticated & IsOwner]

    def get(self, request):

        user = request.user

        try:
            work_in = WorkIn.objects.get(user=user)
            restaurant = work_in.restaurant
        except WorkIn.DoesNotExist:
            return Response({"error": "You are not associated with any restaurant."}, status=status.HTTP_400_BAD_REQUEST)
        
        meals = Meal.objects.filter(restaurant=restaurant)
        meals_serializer = MealSerializer(meals, many=True)

        categories_serializer = CategorySerializer(Category.objects.all().distinct(), many=True)

        tags_serializer = TagSerializer(Tag.objects.filter(id_tag_category_id=1), many=True)

        return Response({
            "meals": meals_serializer.data,
            "available_categories": categories_serializer.data,
            "available_tags": tags_serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user

        try:
            work_in = WorkIn.objects.get(user=user)
            restaurant = work_in.restaurant
        except WorkIn.DoesNotExist:
            return Response({"error": "You are not associated with any restaurant."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CreateMealSerializer(data=request.data)
        if serializer.is_valid():
            meal = serializer.save(restaurant=restaurant)
            return self.get(request)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        user = request.user
        try:
            work_in = WorkIn.objects.get(user=user)
            restaurant = work_in.restaurant
        except WorkIn.DoesNotExist:
            return Response({"error": "You are not associated with any restaurant."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UpdateMealSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        id = serializer.validated_data["id"]

        try:
            meal = Meal.objects.get(id=id, restaurant=restaurant)
        except Meal.DoesNotExist:
            return Response({"error": "Meal not found or does not belong to your restaurant."}, status=status.HTTP_404_NOT_FOUND)
        
        fields_to_update = ["name", "description", "photo_link", "price", "stock"]
        for field in fields_to_update:
            if field in serializer.validated_data:
                setattr(meal, field, serializer.validated_data[field])

        if "category" in serializer.validated_data:
            try:
                category = Category.objects.filter(id=serializer.validated_data["category"]).first()
                meal.category = category
            except Category.DoesNotExist:
                return Response({"error": "Category not found."}, status=status.HTTP_404_NOT_FOUND)

        if "tags" in serializer.validated_data:
            meal.tag.set(Tag.objects.filter(id__in=serializer.validated_data["tags"]))

        meal.save()

        return self.get(request)