from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.db.models import Count, Q, F
from django.utils.timezone import timedelta
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from django.db.models.functions import TruncMonth
from django.contrib.auth.models import User
from chillzone.models import Menu, Meal, Type, Category, Associate, Command, CommandComposition, WorkIn, Tag
from chillzone.serializers import CommandUpdateSerializer, CommandLineSerializer, CommandSerializer, MenuWithOptionsSerializer, TagSerializer, MenuMealSerializer, MealWithTagSerializer, MealSerializer, CategorySerializer, CreateMealSerializer, UpdateMealSerializer, CreateMenuSerializer, UpdateMenuSerializer

class IsOwner(BasePermission):
    """
    Custom permission to grant access only to users marked as 'is_owner'.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user, 'usermeta') and request.user.usermeta.is_owner
    
class OwnerDashboardView(APIView):
    permission_classes = [IsAuthenticated & IsOwner]

    def get(self, request, *args, **kwargs):
        user = request.user

        try:
            work_in = WorkIn.objects.get(user=user)
            restaurant = work_in.restaurant
        except WorkIn.DoesNotExist:
            return Response({"error": "You are not associated with any restaurant."}, status=status.HTTP_400_BAD_REQUEST)

        # Périodes glissantes
        today = timezone.now().date()
        twelve_months_ago = today - timedelta(days=365)
        thirty_days_ago = today - timedelta(days=30)

        # Définir la plage pour l'année précédente
        start_of_previous_year = twelve_months_ago - timedelta(days=365)
        end_of_previous_year = twelve_months_ago

        commands_current_yer = Command.objects.filter(
            creation_date__gte=twelve_months_ago,
            restauration_place=restaurant
        ).annotate(
            month=F('creation_date__month')
        ).values(
            'month'
        ).annotate(
            count=Count('id')
        ).order_by('month')

        commands_previous_year = Command.objects.filter(
            creation_date__gte=start_of_previous_year,
            creation_date__lt=end_of_previous_year,
            restauration_place=restaurant
        ).annotate(
            month=F('creation_date__month')
        ).values(
            'month'
        ).annotate(
            count=Count('id')
        ).order_by('month')

        data = {
            'commands_per_month_current_year': list(commands_current_yer),
            'commands_per_month_previous_year': list(commands_previous_year),
        }

        return Response(data, status.HTTP_200_OK)
    
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
    
    def post(self, request):
        user = request.user

        try:
            work_in = WorkIn.objects.get(user=user)
            restaurant = work_in.restaurant
        except WorkIn.DoesNotExist:
            return Response({"error": "You are not associated with any restaurant."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CreateMenuSerializer(data=request.data)
        if serializer.is_valid():
            menu = serializer.save(restaurant=restaurant)
            return self.get(request)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        user = request.user

        try:
            work_in = WorkIn.objects.get(user=user)
            restaurant = work_in.restaurant
        except WorkIn.DoesNotExist:
            return Response({"error": "You are not associated with any restaurant."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UpdateMenuSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        id = serializer.validated_data["id"]

        try:
            menu = Menu.objects.get(id=id, restaurant=restaurant)
        except Menu.DoesNotExist:
            return Response({"error": "Menu not found."}, status=status.HTTP_404_NOT_FOUND)

        fields_to_update = ["name", "description", "photo_link", "price", "stock"]
        for field in fields_to_update:
            if field in serializer.validated_data:
                setattr(menu, field, serializer.validated_data[field])

        Associate.objects.filter(menu=menu).delete()

        mutable_data = request.data.copy() 

        category_fields = ["starter", "main", "drink", "dessert", "side", "other"]
        categories_data = {field: mutable_data.pop(field, []) for field in category_fields}

        menu.save()

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

        return self.get(request)

    
class OwnerMealView(APIView):
    permission_classes = [IsAuthenticated & IsOwner]

    def clean_empty_list_fields(self, data):
        """ Remplace les listes contenant une chaîne vide par une liste vide """
        if isinstance(data, dict):
            return {k: [] if v == [''] else v for k, v in data.items()}
        return data

    def get(self, request):

        user = request.user

        try:
            work_in = WorkIn.objects.get(user=user)
            restaurant = work_in.restaurant
        except WorkIn.DoesNotExist:
            return Response({"error": "You are not associated with any restaurant."}, status=status.HTTP_400_BAD_REQUEST)
        
        meals = Meal.objects.filter(restaurant=restaurant)
        meals_serializer = MealWithTagSerializer(meals, many=True)

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
        
        cleaned_data = self.clean_empty_list_fields(request.data)

        serializer = CreateMealSerializer(data=cleaned_data)
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

        meal.tag.clear()
        if "tags" in serializer.validated_data:
            meal.tag.set(Tag.objects.filter(id__in=serializer.validated_data["tags"]))

        meal.save()

        return self.get(request)


class OwnerCommandsView(APIView):
    permission_classes = [IsAuthenticated & IsOwner]
    
    def get(self, request):
        restaurants = WorkIn.objects.filter(user=request.user).values_list('restaurant', flat=True)
        commands = Command.objects.filter(restauration_place__in=restaurants).order_by('-creation_date')

        formatted_commands = []
        for command in commands:
            command_data = CommandSerializer(command).data
            command_data['lines'] = []

            command_compositions = CommandComposition.objects.filter(command=command)
            lines_dict = {}

            for idx, composition in enumerate(command_compositions, start=1):
                command_line = composition.line
                line_data = CommandLineSerializer(command_line).data

                line_content_list = []
                for line_content in command_line.linecontent_set.all():
                    if line_content.menu:
                        line_content_list.append({
                            "menu": MenuMealSerializer(line_content.menu).data
                        })
                    elif line_content.meal:
                        line_content_list.append({
                            "meal": MealSerializer(line_content.meal).data
                        })

                lines_dict[str(idx)] = {"quantity": command_line.quantity}

                if line_content_list:
                    lines_dict[str(idx)].update(line_content_list[0])

            command_data['lines'].append(lines_dict)
            formatted_commands.append(command_data)

        available_status = [status[0] for status in Command.STATUS_CHOICES]

        return Response({
            'commands': formatted_commands,
            'available_status': available_status
        }, status=status.HTTP_200_OK)
    
    def put(self, request):
        user = request.user
        try:
            work_in = WorkIn.objects.get(user=user)
            restaurant = work_in.restaurant
        except WorkIn.DoesNotExist:
            return Response({"error": "You are not associated with any restaurant."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CommandUpdateSerializer(data=request.data)
        if serializer.is_valid():
            id = serializer.validated_data["id"]
        
            command = get_object_or_404(Command, id=id)
            
            if restaurant != command.restauration_place : 
                return Response({"error": "You can't modify this command."}, status=status.HTTP_400_BAD_REQUEST)

            command.status = serializer.validated_data['status']
            command.save()
            return self.get(request)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)