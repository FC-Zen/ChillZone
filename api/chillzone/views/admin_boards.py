from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from django.db.models import Count, Q, F
from django.utils.timezone import timedelta
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from chillzone.services import EmailService
from chillzone.models import UserMeta, LocationReservation, Conflict, Location, MapFloor, RestaurationPlace, LinkTo, Tag, TagCategory, IsLocated
from chillzone.serializers import AdminCreateLocationSerializer, TagSerializer, AdminUserSerializer, AdminLocationSerializer, AdminAvailableFloorsSerializer, AdminEstablishmentSerializer, AdminMapFloorSerializer, AdminLocationReservationSerializer, AdminConflictSerializer, AdminConfirmedRestaurantSerializer, AdminPendingRestaurantSerializer, UserCreateSerializer, DashboardSerializer

import random
import string

def generate_random_password():
    characters = string.ascii_letters + string.digits + string.punctuation
    password = [
        random.choice(string.ascii_uppercase),
        random.choice(string.ascii_lowercase),
        random.choice(string.digits),
        random.choice(string.punctuation)
    ]
    password += random.choices(characters, k=12)
    random.shuffle(password)
    return ''.join(password)

class AdminDashboardView(APIView):

    def get(self, request, *args, **kwargs):

        # Périodes glissantes
        today = timezone.now().date()
        twelve_months_ago = today - timedelta(days=365)
        thirty_days_ago = today - timedelta(days=30)

        # Définir la plage pour l'année précédente
        start_of_previous_year = twelve_months_ago - timedelta(days=365)
        end_of_previous_year = twelve_months_ago

        # 1. Réservations par mois
        reservations_current_year = LocationReservation.objects.filter(
            day_reservation__gte=twelve_months_ago
        ).annotate(
            month=F('day_reservation__month')
        ).values(
            'month'
        ).annotate(
            count=Count('id')
        ).order_by('month')

        reservations_previous_year = LocationReservation.objects.filter(
            day_reservation__gte=start_of_previous_year,
            day_reservation__lt=end_of_previous_year
        ).annotate(
            month=F('day_reservation__month')
        ).values(
            'month'
        ).annotate(
            count=Count('id')
        ).order_by('month')

        # 2. Connexions par mois
        connections_current_year = User.objects.filter(
            last_login__gte=twelve_months_ago
        ).annotate(
            month=F('last_login__month')
        ).values(
            'month'
        ).annotate(
            count=Count('id')
        ).order_by('month')

        connections_previous_year = User.objects.filter(
            last_login__gte=start_of_previous_year,
            last_login__lt=end_of_previous_year
        ).annotate(
            month=F('last_login__month')
        ).values(
            'month'
        ).annotate(
            count=Count('id')
        ).order_by('month')

        # 3. Nombre de nouveaux utilisateurs
        users_current_year = User.objects.filter(date_joined__gte=twelve_months_ago).count()
        users_previous_year = User.objects.filter(
            date_joined__gte=start_of_previous_year,
            date_joined__lt=end_of_previous_year
        ).count()
        users_percentage_change = ((users_current_year - users_previous_year) / users_previous_year) * 100 if users_previous_year else 0

        # 4. Nombre de signalements reçus
        reports_current_month = Conflict.objects.filter(
            reservation__creation_date__gte=thirty_days_ago
        ).count()
        reports_previous_month = Conflict.objects.filter(
            reservation__creation_date__gte=(thirty_days_ago - timedelta(days=30)),
            reservation__creation_date__lt=thirty_days_ago
        ).count()
        reports_percentage_change = ((reports_current_month - reports_previous_month) / reports_previous_month) * 100 if reports_previous_month else 0

        # 5. Locations disponibles
        available_locations = Location.objects.filter(status=True).count()

        # 6. Restaurants disponibles
        available_restaurants = LinkTo.objects.filter(status=True).count()

        data = {
            'reservations_per_month_current_year': list(reservations_current_year),
            'reservations_per_month_previous_year': list(reservations_previous_year),
            'connections_per_month_current_year': list(connections_current_year),
            'connections_per_month_previous_year': list(connections_previous_year),
            'users_current_year': users_current_year,
            'users_previous_year': users_previous_year,
            'users_percentage_change': users_percentage_change,
            'reports_current_month': reports_current_month,
            'reports_previous_month': reports_previous_month,
            'reports_percentage_change': reports_percentage_change,
            'available_locations': available_locations,
            'available_restaurants': available_restaurants,
        }

        return Response(data, status=200)



class AdminUserView(generics.ListAPIView):
    serializer_class = AdminUserSerializer
    permission_classes = [IsAuthenticated & IsAdminUser]

    def get_queryset(self):
        return User.objects.filter(
            is_active=True,
            usermeta__establishment=self.request.user.usermeta.establishment,
            usermeta__is_verified=True,
        ).annotate(
            reservation_count=Count('reservation', filter=Q(reservation__status='Confirmed'))
        )

    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():

            random_password = generate_random_password()
            print(f"Generated password: {random_password}")

            try:
                user = User.objects.create_user(
                    username=serializer.validated_data['username'],
                    email=serializer.validated_data['email'],
                    password=random_password,
                    first_name=serializer.validated_data['first_name'],
                    last_name=serializer.validated_data['last_name'],
                    is_staff=serializer.validated_data['is_admin'],
                    is_active=not(serializer.validated_data['is_admin'])
                )
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            UserMeta.objects.create(
                user=user,
                is_verified=not(serializer.validated_data['is_admin']),
                role=serializer.validated_data['role'],
                establishment=request.user.usermeta.establishment
            )

            if not EmailService.send_create_account_mail(user.email, user.first_name, user.last_name, user.username, random_password):
                return Response({"error": "Failed to send email."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({"message": "User created successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, *args, **kwargs):
        user_id = request.data.get('id')
        is_block = request.data.get('is_block')
        is_active = request.data.get('is_active')

        if user_id is None:
            return Response({"error": "Id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(
                id=user_id,
                usermeta__establishment=request.user.usermeta.establishment
            )
            user_meta = user.usermeta
        except User.DoesNotExist:
            return Response({"error": "Utilisateur non trouvé dans votre établissement."}, status=status.HTTP_404_NOT_FOUND)

        if is_block is not None :
            user_meta.is_block = is_block
            user_meta.save()
        elif is_active is not None and not bool(is_active) and bool(user.is_active):
            user.is_active = False
            user.save()        

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
class AdminLocationView(generics.ListAPIView):
    serializer_class = AdminCreateLocationSerializer
    permission_classes = [IsAuthenticated & IsAdminUser]

    def get(self, request):
        establishment = request.user.usermeta.establishment

        locations = Location.objects.filter(islocated__establishment=establishment)
        location_serializer = AdminLocationSerializer(locations, many=True)

        floors = MapFloor.objects.filter(map__establishment=establishment)
        floor_serializer = AdminAvailableFloorsSerializer(floors, many=True)

        try:
            location_category = TagCategory.objects.get(label="Location")
        except TagCategory.DoesNotExist:
            return Response({"error": "Tag category 'Location' not found."}, status=status.HTTP_404_NOT_FOUND)

        tags = Tag.objects.filter(id_tag_category=location_category)
        serializer = TagSerializer(tags, many=True)

        return Response({
            "locations": location_serializer.data,
            "available_floors": floor_serializer.data,
            "available_types": serializer.data
        })
    
    def post(self, request) :
        user_meta = request.user.usermeta
        establishment = user_meta.establishment

        if not establishment:
            return Response({"error": "No establishment associated with the user."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = AdminCreateLocationSerializer(data=request.data)
        if serializer.is_valid():
            tag = Tag.objects.filter(id=request.data.get("id_type")).first()
            if not tag:
                return Response({"error": f"Type '{request.data.get('id_type')}' not found."}, status=status.HTTP_404_NOT_FOUND)
            
            floor = MapFloor.objects.filter(id=request.data.get("id_floor")).first()
            if not tag:
                return Response({"error": f"Type '{request.data.get('id_floor')}' not found."}, status=status.HTTP_404_NOT_FOUND)

            location = Location.objects.create(
                name=serializer.validated_data['name'],
                description=serializer.validated_data['description'],
                photo_link=serializer.validated_data['photo_link'],
                id_type=tag,
                id_floor=floor,
                capacity=serializer.validated_data['capacity'],
                position_x=serializer.validated_data['position_x'],
                position_y=serializer.validated_data['position_y']
            )

            IsLocated.objects.create(
                establishment=establishment,
                location=location
            )

            return self.get(request)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        user_meta = request.user.usermeta
        establishment = user_meta.establishment

        if not establishment:
            return Response({"error": "No establishment associated with the user."}, status=status.HTTP_400_BAD_REQUEST)

        location_id = request.data.get("id")
        new_status = request.data.get("status")

        if not location_id:
            return Response({"error": "Location ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        if new_status is not None:
            try:
                location = Location.objects.get(id=location_id, islocated__establishment=establishment)
            except Location.DoesNotExist:
                return Response({"error": "Location not found or does not belong to your establishment."}, status=status.HTTP_404_NOT_FOUND)

            location.status = new_status
            location.save()
            return self.get(request)
   
        else :
            try:
                location = Location.objects.get(id=location_id, islocated__establishment=establishment)
            except Location.DoesNotExist:
                return Response({"error": "Location not found or does not belong to your establishment."}, status=status.HTTP_404_NOT_FOUND)

            serializer = AdminCreateLocationSerializer(location, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return self.get(request)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AdminReservationConflictView(APIView):
    permission_classes = [IsAuthenticated & IsAdminUser]

    def get(self, request, *args, **kwargs):
        establishment = request.user.usermeta.establishment

        reservations = LocationReservation.objects.filter(
            location__islocated__establishment=establishment
        )
        conflicts = Conflict.objects.filter(
            reservation__locationreservation__location__islocated__establishment=establishment
        )

        reservation_serializer = AdminLocationReservationSerializer(reservations, many=True)
        conflict_serializer = AdminConflictSerializer(conflicts, many=True)

        return Response({
            "reservations": reservation_serializer.data,
            "conflicts": conflict_serializer.data
        })

class AdminMapView(APIView):
    permission_classes = [IsAuthenticated & IsAdminUser]

    def get(self, request, *args, **kwargs):
        establishment = request.user.usermeta.establishment
        establishment_serializer = AdminEstablishmentSerializer(establishment)
        floors = MapFloor.objects.filter(map__establishment=establishment)
        floors_serializer = AdminMapFloorSerializer(floors, many=True)

        return Response({
            "establishment": establishment_serializer.data,
            "floors": floors_serializer.data
        })
    
class AdminRestaurantView(APIView):
    permission_classes = [IsAuthenticated & IsAdminUser]

    def get(self, request, *args, **kwargs):
        establishment = request.user.usermeta.establishment
        confirmed_restaurants = RestaurationPlace.objects.filter(
            linkto__establishment=establishment, linkto__status=True, is_valid=True
        )
        pending_restaurants = RestaurationPlace.objects.filter(
            linkto__establishment=establishment, linkto__status=False, is_valid=True
        )
        confirmed_serializer = AdminConfirmedRestaurantSerializer(confirmed_restaurants, many=True)
        pending_serializer = AdminPendingRestaurantSerializer(pending_restaurants, many=True)

        return Response({
            "confirmed_restaurants": confirmed_serializer.data,
            "pending_restaurants": pending_serializer.data
        })
    
    def post(self, request):
        restaurant_id = request.data.get('id')
        
        if not restaurant_id:
            return Response({"error": "Id required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            establishment = request.user.usermeta.establishment

            link = LinkTo.objects.get(
                restaurant_id=restaurant_id,
                establishment=establishment
            )
            
            link.status = True
            link.save()

            return self.get(request)

        except LinkTo.DoesNotExist:
            return Response(
                {"error": "Le restaurant n'existe pas ou n'est pas associé à votre établissement."},
                status=status.HTTP_404_NOT_FOUND
            )
    
    def delete(self, request):
        restaurant_id = request.data.get('id')
        
        if not restaurant_id:
            return Response({"error": "Id required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            establishment = request.user.usermeta.establishment

            link = LinkTo.objects.get(
                restaurant_id=restaurant_id,
                establishment=establishment
            )
            
            link.delete()

            return self.get(request)

        except LinkTo.DoesNotExist:
            return Response(
                {"error": "Le restaurant n'existe pas ou n'est pas associé à votre établissement."},
                status=status.HTTP_404_NOT_FOUND
            )
