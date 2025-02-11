from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from django.db.models import Count, Q, F
from django.utils.timezone import timedelta
from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from django.contrib.auth.models import User
from chillzone.models import WorkIn, LinkTo
from chillzone.services import EmailService
from chillzone.serializers import SuperAdminUserSerializer, SuperAdminRequestAdminSerializer, RestaurantRegisterRequestSerializer

import random
import string

# GET pending_restaurants_inscription + all_users

class IsSuperAdmin(BasePermission):
    """
    Custom permission to grant access only to users marked as 'is_superadmin'.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser
    
class SuperAdminRequestsView(APIView):
    permission_classes = [IsAuthenticated & IsSuperAdmin] 

    def get(self, request, *args, **kwargs):
        # DEMANDES INSCRIPTIONS RESTAURATEURS
        affiliation_requests = WorkIn.objects.select_related('user', 'restaurant').filter(
            user__usermeta__is_verified=False,  
            user__usermeta__is_owner=True,
            restaurant__is_valid=False 
        )
        register_requests = RestaurantRegisterRequestSerializer(affiliation_requests, many=True)
        # DEMANDES CREATION ADMINS
        admin_requests = User.objects.filter(
            usermeta__is_verified=False,
            is_staff=True
        )
        register_admin_requests = SuperAdminRequestAdminSerializer(admin_requests, many=True)
        
        return Response({
            "register_requests": register_requests.data,
            "admin_requests" : register_admin_requests.data
        })
        
        
    def put(self, request, *args, **kwargs):
        user_id = request.data.get('id')
        
        if user_id is None:
            return Response({"error": "Id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = get_object_or_404(User, id=user_id)
        
        if user.is_staff : 
            user.usermeta.is_verified = True
            user.is_active = True
        
        elif user.usermeta.is_owner : 
            user.usermeta.is_verified = True
            user.is_active = True
            workin = WorkIn.objects.get(
                user = user_id
            )
            workin.restaurant.is_valid = True
        
        user.usermeta.save()
        user.save()    

        if not EmailService.send_account_approval_email(user.email):
                return Response({"error": "Failed to send email."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return self.get(request)
    
    
    
    def delete(self, request):
        user_id = request.data.get('id')
            
        if not user_id:
            return Response({"error": "Id is required"}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, id=user_id)
                
        if user.usermeta.is_owner:
            try:
                workin = WorkIn.objects.get(user=user)
                restaurant = workin.restaurant

                workin.delete()

                LinkTo.objects.filter(restaurant=restaurant).delete()

                restaurant.delete()
    
            except WorkIn.DoesNotExist:
                    return Response({"error": "WorkIn not found for this user"}, status=status.HTTP_404_NOT_FOUND)
        
        user_meta = user.usermeta
        user_meta.delete()

        user.delete()

        if not EmailService.send_account_rejection_email(user.email):
                return Response({"error": "Failed to send email."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return self.get(request)
    

class SuperAdminUsersView(APIView):
    permission_classes = [IsAuthenticated & IsSuperAdmin] 

    def get(self, request, *args, **kwargs):
        # ALL USERS
        not_suspended_users = User.objects.filter(
            usermeta__is_verified=True
        )
        all_users = SuperAdminUserSerializer(not_suspended_users, many=True)

        return Response({
            "users" : all_users.data
        })
    
    def put(self, request, *args, **kwargs):
        user_id = request.data.get('id')
        is_active = request.data.get('is_active')

        if user_id is None:
            return Response({"error": "Id is required"}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, id=user_id)
        
        user.is_active = is_active
        user.save()        

        return self.get(request)