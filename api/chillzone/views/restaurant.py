from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from chillzone.models import RestaurationPlace
from chillzone.serializers import OpenRestaurantSerializer

class ClientRestaurantView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_meta = request.user.usermeta
        establishment = user_meta.establishment

        if not establishment:
            return Response({"error": "No establishment associated with the user."}, status=400)

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
        })