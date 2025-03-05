from django.db import transaction, DatabaseError
from django.db.models import Q
from django.utils.timezone import now
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from chillzone.models import RestaurationPlace, Meal, Menu, Associate, Type, LineContent, Command, CommandLine, CommandComposition
from chillzone.services import QRCodeService
from chillzone.serializers import OpenRestaurantSerializer, MealWithTagSerializer, MenuSerializer, CommandCreateSerializer

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
    serializer_class = CommandCreateSerializer

    def get(self, request, id):
        if not id:
            return Response({"error": "Id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            restaurant = RestaurationPlace.objects.get(id=id)
        except RestaurationPlace.DoesNotExist:
            return Response({"error": "Restaurant not found"}, status=status.HTTP_404_NOT_FOUND)

        meals = Meal.objects.filter(restaurant=restaurant, stock__gt=0)
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
                for meal in Meal.objects.filter(category=associate.category, stock__gt=0):
                    print(meal)
                    meals_by_type[type_label][category_label].append(MealWithTagSerializer(meal).data)
            
            menu_data["meals_by_type"] = meals_by_type
            menus_data.append(menu_data)

        response_data = {
            "restaurant": OpenRestaurantSerializer(restaurant).data,
            "aLaCarte": meals_by_category,
            "menus": menus_data
        }

        return Response(response_data, status=status.HTTP_200_OK)
    
    def post(self, request, id):
        serializer = CommandCreateSerializer(data=request.data)        
        user = request.user

        if serializer.is_valid():
            payment_method = serializer.validated_data['payment_method']
            pickup_time = serializer.validated_data['pickup_time']
            lines_data = serializer.validated_data['lines']

            try:   
                with transaction.atomic():

                    savepoint = transaction.savepoint()

                    try:
                    
                        command = Command.objects.create(
                            payment_method=payment_method,
                            pickup_time=pickup_time,
                            user=user,
                            restauration_place=RestaurationPlace.objects.get(id=id)
                        )

                        for line_data in lines_data:
                            for line_id, content in line_data.items():
                                quantity = content['quantity']
                                menu_data = content.get('menu')
                                meal_id = content.get('meal')

                                command_line = CommandLine.objects.create(quantity=quantity)
                                CommandComposition.objects.create(command=command, line=command_line)

                                if menu_data:
                                    menu = Menu.objects.get(id=menu_data['id'], restaurant=RestaurationPlace.objects.get(id=id))
                                    for meal_id in menu_data['meals']:
                                        meal = Meal.objects.get(id=meal_id)
                                        if meal.stock < quantity:
                                            raise ValueError(f"Stock insuffisant pour {meal.name}.")
                                        meal.stock -= quantity
                                        meal.save()
                                        LineContent.objects.create(menu=menu, meal=meal, command_line=command_line)
                                else:
                                    meal = Meal.objects.get(id=meal_id, restaurant=RestaurationPlace.objects.get(id=id))
                                    if meal.stock < quantity:
                                        raise ValueError(f"Stock insuffisant pour {meal.name}.")
                                    meal.stock -= quantity
                                    meal.save()
                                    LineContent.objects.create(meal=meal, command_line=command_line)

                        # Génération du QR Code si tout est validé
                        qrcode_filename = f"{user.id}{id}{now().strftime('%Y%m%d_%H%M%S')}.png"
                        qrcode_path = QRCodeService.generate_qr_code_command(command_id=command.id, filename=qrcode_filename)
                        command.qrcode_link = "qrcode/" + qrcode_path
                        command.save()

                    except (ObjectDoesNotExist, ValueError) as e:
                        transaction.savepoint_rollback(savepoint)
                        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
                    
                    return Response({
                        "qrcode": qrcode_path,
                        "command_id": command.id
                    }, status=status.HTTP_201_CREATED)
                    
                    #return Response({"qrcode": qrcode_path}, status=status.HTTP_201_CREATED)
                    
            except DatabaseError:
                return Response({"error": "Une erreur est survenue lors de la création de la commande. Veuillez réessayer."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)