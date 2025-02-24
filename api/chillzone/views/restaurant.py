from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from chillzone.models import RestaurationPlace, Meal, Menu, Associate, Type
from chillzone.serializers import OpenRestaurantSerializer, MealWithTagSerializer, MenuSerializer

class ClientRestaurantView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_meta = request.user.usermeta
        establishment = user_meta.establishment

        if not establishment:
            return Response({"error": "No establishment associated with the user."}, status=status.HTTP_400_BAD_REQUEST)

        non_crous_restaurants = RestaurationPlace.objects.filter(
            restauration_type="restaurant"
        ).exclude(
            Q(name__icontains="Crous") | Q(description__icontains="Crous")
        ).filter(
            linkto__establishment=establishment,
            linkto__status=True,
            is_valid=True
        )

        crous_restaurants = RestaurationPlace.objects.filter(
            restauration_type="restaurant"
        ).filter(
            Q(name__icontains="Crous") | Q(description__icontains="Crous")
        ).filter(
            linkto__establishment=establishment,
            linkto__status=True,
            is_valid=True
        )

        fridges = RestaurationPlace.objects.filter(
            restauration_type="fridge",
            linkto__establishment=establishment,
            linkto__status=True,
            is_valid=True
        )

        return Response({
            "non_crous_restaurants": OpenRestaurantSerializer(non_crous_restaurants, many=True).data,
            "crous_restaurants": OpenRestaurantSerializer(crous_restaurants, many=True).data,
            "fridges": OpenRestaurantSerializer(fridges, many=True).data,
        }, status=status.HTTP_200_OK)
    
class RestaurantView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        if not id:
            return Response({"error": "Id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            restaurant = RestaurationPlace.objects.get(id=id)
        except RestaurationPlace.DoesNotExist:
            return Response({"error": "Restaurant not found"}, status=status.HTTP_404_NOT_FOUND)

        meals = Meal.objects.filter(restaurant=restaurant)
        meals_by_category = {}
        for meal in meals:
            category_label = meal.category.label if meal.category else "Uncategorized"
            if category_label not in meals_by_category:
                meals_by_category[category_label] = []
            meals_by_category[category_label].append(MealWithTagSerializer(meal).data)

        menus = Menu.objects.filter(restaurant=restaurant)
        menus_data = []
        type_choices = dict(Type.TYPE_CHOICES)
        for menu in menus:
            menu_data = MenuSerializer(menu).data
            meals_by_type = {type_label: {} for type_label in type_choices.values()}
            associated_meals = Associate.objects.filter(menu=menu)
            for associate in associated_meals:
                type_label = type_choices.get(associate.type.label, "Other")
                category_label = associate.category.label if associate.category else "Uncategorized"
                if category_label not in meals_by_type[type_label]:
                    meals_by_type[type_label][category_label] = []
                for meal in Meal.objects.filter(category=associate.category):  # Correction ici pour associer le bon type et catégorie
                    meals_by_type[type_label][category_label].append(MealWithTagSerializer(meal).data)
            
            menu_data["meals_by_type"] = meals_by_type
            menus_data.append(menu_data)

        response_data = {
            "restaurant": OpenRestaurantSerializer(restaurant).data,
            "aLaCarte": meals_by_category,
            "menus": menus_data
        }

        return Response(response_data, status=status.HTTP_200_OK)
