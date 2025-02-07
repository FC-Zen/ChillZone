from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from django.shortcuts import get_object_or_404
from chillzone.models import Network
from chillzone.serializers import NetworkSerializer, AdminNetworkSerializer

class NetworkView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_meta = request.user.usermeta
        establishment = user_meta.establishment if user_meta else None

        if not establishment:
            return Response({"error": "No establishment associated with the user."}, status=status.HTTP_400_BAD_REQUEST)

        networks = Network.objects.filter(establishment=establishment)
        serializer = NetworkSerializer(networks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AdminNetworkView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        user_meta = request.user.usermeta
        establishment = user_meta.establishment if user_meta else None

        if not establishment:
            return Response({"error": "No establishment associated with the user."}, status=status.HTTP_400_BAD_REQUEST)
        
        used_types = Network.objects.filter(establishment=establishment).values_list("type", flat=True)
        
        available_types = [
            {"id": type_choice[0], "label": type_choice[1]}
            for type_choice in Network.TYPE_CHOICES if type_choice[0] not in used_types
        ]

        networks = Network.objects.filter(establishment=establishment)
        serializer = AdminNetworkSerializer(networks, many=True)

        return Response({
            "networks": serializer.data,
            "available_types": available_types
        }, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AdminNetworkSerializer(data=request.data)
        if serializer.is_valid():
            establishment = request.user.usermeta.establishment
            if not establishment:
                return Response({"error": "No establishment associated with the user."}, status=status.HTTP_400_BAD_REQUEST)

            if Network.objects.filter(establishment=establishment, type=serializer.validated_data['type']).exists():
                return Response({"error": "Network type already exists for this establishment."}, status=status.HTTP_400_BAD_REQUEST)

            Network.objects.create(
                type=serializer.validated_data['type'],
                link_network=serializer.validated_data['link_network'],
                establishment=establishment
            )
            return self.get(request)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        network_id = request.data.get('id')
        print(network_id)
        if not network_id:
            return Response({"error": "Network ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        network = get_object_or_404(Network, id=network_id)
        establishment = request.user.usermeta.establishment
        if network.establishment != establishment:
            return Response({"error": "You do not have permission to modify this network."}, status=status.HTTP_403_FORBIDDEN)

        serializer = AdminNetworkSerializer(network, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return self.get(request)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        network_id = request.data.get('id')
        if not network_id:
            return Response({"error": "Network ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        network = get_object_or_404(Network, id=network_id)
        establishment = request.user.usermeta.establishment
        if network.establishment != establishment:
            return Response({"error": "You do not have permission to delete this network."}, status=status.HTTP_403_FORBIDDEN)

        network.delete()
        return self.get(request)