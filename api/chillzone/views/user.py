from django.shortcuts import get_object_or_404
from django.contrib import auth

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission

from django.contrib.auth.models import User
from chillzone.serializers import UserCreateSerializer, UserLoginSerializer, UserPasswordSerializer, UserSerializer

class UserPermission(BasePermission) :
    def has_permission(self, request, view):
        if request.method == "GET":
            return request.user.has_perm('auth.view_user')
        elif request.method == "POST":
            return request.user.has_perm('auth.change_user')
        elif request.method == "DELETE":
            return request.user.has_perm('auth.delete_user')

class UserCreateView(APIView):

    permission_classes = [IsAuthenticated & UserPermission & IsAdminUser] # And => &, Or => |, Not => ~ 

    def post(self, request):
        serializer = UserCreateSerializer(data = request.data)
        if serializer.is_valid():
            try :
                user = User.objects.create_user(serializer.validated_data['username'], serializer.validated_data['email'])
            except :
                return Response({'error': "Le nom d'utilisateur est déjà utilisé."}, status=status.HTTP_400_BAD_REQUEST)
            
            user.set_unusable_password()

            user_serializer = UserSerializer(user)
            return Response(user_serializer.data)
        
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)
    
class UsersView(APIView) :

    permission_classes = [IsAuthenticated & UserPermission & IsAdminUser] # And => &, Or => |, Not => ~ 

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class UserView(APIView) :

    permission_classes = [IsAuthenticated & UserPermission] # And => &, Or => |, Not => ~ 

    def get(self, request, user_id) :
        user = get_object_or_404(User, pk=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def post(self, request, user_id) : 
        user = get_object_or_404(User, pk=user_id)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data)
        else : 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserPasswordView(APIView) :

    permission_classes = [IsAuthenticated & UserPermission & IsAdminUser] # And => &, Or => |, Not => ~ 

    def post(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        serializer = UserPasswordSerializer(data=request.data)
        if serializer.is_valid() and serializer.validated_data['password'] == serializer.validated_data['confirm_password'] :
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else : 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class UserLoginView(APIView) :

    def post(self, request):
        if request.user is not None and request.user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            
            user = auth.authenticate(request, username=serializer.validated_data['login'], password=serializer.validated_data['password'])

            if user is None :
                try:
                    user = get_object_or_404(User, email=serializer.validated_data['login'])
                except:
                    pass

                user = auth.authenticate(request, username=user.username, password=serializer.validated_data['password'])

            if user is not None :
                auth.login(request, user)
                return Response({'Connexion réussie'})
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        if request.user is None or not request.user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        auth.logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)