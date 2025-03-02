from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from chillzone.models import Notification
from chillzone.serializers import NotificationSerializer

class NotificationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(user=request.user)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def put(self, request):
        try:
            notification = Notification.objects.get(user=request.user)
        except Notification.DoesNotExist:
            return Response({'error': 'Notification settings not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = NotificationSerializer(notification, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)