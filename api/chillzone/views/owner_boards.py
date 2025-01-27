from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from django.db.models import Count, Q, F
from django.utils.timezone import timedelta
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
from django.contrib.auth.models import User
from chillzone.models import RestaurationPlace, Menu, Meal, Type, Category, Associate, LineContent, Command, CommandLine, CommandComposition, WorkIn
from chillzone.serializers import MenuWithOptionsSerializer

class IsOwner(BasePermission):
    """
    Custom permission to grant access only to users marked as 'is_owner'.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user, 'usermeta') and request.user.usermeta.is_owner
    
class OwnerMenuView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

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
        available_options = [{"id": category.id, "label": category.label} for category in categories]

        data = {
            "menus" : serializer_menus.data,
            "available_options" : available_options
        }
        return Response(data, status=status.HTTP_200_OK)