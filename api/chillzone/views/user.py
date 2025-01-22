from django.shortcuts import get_object_or_404
from django.contrib import auth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from chillzone.serializers import UserLoginSerializer, PasswordChangeSerializer, PasswordResetEmailSerializer, PasswordResetSerializer, UserInfoUpdateSerializer, UserInfoSerializer
from chillzone.models import Token
from rest_framework.permissions import IsAuthenticated
from django.utils.timezone import now, timedelta
from chillzone.services import EmailService

import uuid
    
class UserLogin(APIView) :
    serializer_class = UserLoginSerializer

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
                user_meta = request.user.usermeta
                request.session.set_expiry(0)
                if user.is_superuser :
                    type = 'superadmin'
                elif user.is_staff :
                    type = 'admin'
                elif user_meta.is_owner :
                    type = 'owner'
                else :
                    type = 'user'

                response_data = {
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.email,
                    'establishment': user_meta.establishment.name if user_meta and user_meta.establishment else None,
                    'phone': user_meta.phone if user_meta and user_meta.phone else None,
                    'photo_link': user_meta.photo_link.url if user_meta and user_meta.photo_link else '/default',
                    'type': type
                }
                
                res = Response(response_data, status=status.HTTP_200_OK)
                res.set_cookie('sessionid', request.session.session_key, httponly=False, samesite='Lax', secure=False)  # test sans secure
                return res
        
            else :
                return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        if request.user is None or not request.user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)

        auth.logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ChangePasswordView(APIView):
    serializer_class = PasswordChangeSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = PasswordChangeSerializer(data=request.data)
        if serializer.is_valid():
            password_actual = serializer.validated_data['password_actual']
            new_password = serializer.validated_data['password']

            user = request.user

            if not user.check_password(password_actual):
                return Response({"error": "Current password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()

            return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PasswordForgetView(APIView):
    serializer_class = PasswordResetEmailSerializer

    def post(self, request):
            serializer = PasswordResetEmailSerializer(data=request.data)
            if serializer.is_valid():
                email = serializer.validated_data["email"]
                user = User.objects.get(email=email)

                token, created = Token.objects.update_or_create(
                    user=user,
                    defaults={
                        "token": uuid.uuid4(),
                        "expiration_date": now() + timedelta(minutes=1)
                    }
                )

                reset_link = f"http://localhost:5173/reset-password?token={token.token}"

                if not EmailService.send_reset_email(user.email, reset_link):
                    return Response({"error": "Failed to send email."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                return Response({"message": "Password reset email sent successfully."}, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PasswordResetView(APIView):
    serializer_class = PasswordResetSerializer

    def get(self, request, uuid):
        try:
            token = Token.objects.get(token=uuid)
            if token.expiration_date < now():
                return Response({"error": "Token has expired."}, status=status.HTTP_404_NOT_FOUND)
        except Token.DoesNotExist:
            return Response({"error": "Invalid token."}, status=status.HTTP_404_NOT_FOUND)

        return Response({"message": "Valid token."}, status=status.HTTP_200_OK)

    def put(self, request, uuid):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            new_password = serializer.validated_data['password']

            try:
                token = Token.objects.get(token=uuid)
                if token.expiration_date < now():
                    return Response({"error": "Token has expired."}, status=status.HTTP_404_NOT_FOUND)

                user = token.user
                user.set_password(new_password)
                user.save()

                token.delete()

                return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)

            except Token.DoesNotExist:
                return Response({"error": "Invalid token."}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserInfoUpdateView(APIView):
    serializer_class = UserInfoUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserInfoSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        serializer = UserInfoUpdateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = request.user
            user.first_name = serializer.validated_data.get('first_name', user.first_name)
            user.last_name = serializer.validated_data.get('last_name', user.last_name)
            user.email = serializer.validated_data.get('email', user.email)

            user_meta = request.user.usermeta
            if user_meta:
                user_meta.phone = serializer.validated_data.get('phone', user_meta.phone)
                user_meta.save()

            user.save()

            return Response({"message": "User information updated successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)