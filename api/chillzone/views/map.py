from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from chillzone.models import MapFloor
from chillzone.serializers import AdminMapFloorSerializer

class MapView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        establishment = request.user.usermeta.establishment

        floors = MapFloor.objects.filter(map__establishment=establishment)
        floors_serializer = AdminMapFloorSerializer(floors, many=True)

        return Response({
            "floors": floors_serializer.data
        }, status=status.HTTP_200_OK)