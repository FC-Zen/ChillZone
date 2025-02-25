from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.db import transaction
from django.contrib.auth.models import User
from django.utils.timezone import now, timedelta
from chillzone.serializers import UserLoginSerializer, OwnerEstablishmentSerializer, PasswordChangeSerializer, PasswordResetEmailSerializer, PasswordResetSerializer, UserInfoUpdateSerializer, UserInfoSerializer, OwnerCreateSerializer, NotificationSerializer
from chillzone.models import Token, LinkTo, WorkIn, RestaurationPlace, UserMeta, Establishment, Notification
from chillzone.services import EmailService

import uuid
    
class UserLogin(APIView) :
    serializer_class = UserLoginSerializer

    def get(self, request):
        if request.user.is_authenticated:

            user_meta = getattr(request.user, 'usermeta', None)

            if request.user.is_superuser :
                type = 'superadmin'
            elif request.user.is_staff :
                type = 'admin'
            elif user_meta.is_owner :
                type = 'owner'
            else :
                type = 'user'
            
            response_data = {
                'first_name': request.user.first_name,
                'last_name': request.user.last_name,
                'email': request.user.email,
                'establishment': getattr(user_meta.establishment, 'name', None) if user_meta else None,
                'phone': user_meta.phone if user_meta else None,
                'photo_link': user_meta.photo_link.url if user_meta and user_meta.photo_link else '/default',
                'type': type
            }

            if type == 'user':
                notifications = Notification.objects.filter(user=request.user)
                response_data['notifications'] = NotificationSerializer(notifications, many=True).data

            return Response(response_data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request):
        if request.user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = UserLoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=serializer.validated_data['login'], password=serializer.validated_data['password'])
        
        if user is None:
            user = User.objects.filter(email=serializer.validated_data['login']).first()
            if user:
                user = authenticate(request, username=user.username, password=serializer.validated_data['password'])

        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_403_FORBIDDEN)
        
        login(request, user)
        request.session.set_expiry(None)
        user_meta = getattr(user, 'usermeta', None)

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
            'establishment': getattr(user_meta.establishment, 'name', None) if user_meta else None,
            'phone': user_meta.phone if user_meta else None,
            'photo_link': user_meta.photo_link.url if user_meta and user_meta.photo_link else '/default',
            'type': type
        }
        
        if type == 'user':
            notifications = Notification.objects.filter(user=user)
            response_data['notifications'] = NotificationSerializer(notifications, many=True).data

        response = Response(response_data, status=status.HTTP_200_OK)
        response.set_cookie('sessionid', request.session.session_key, httponly=False, samesite='Lax', secure=False)
        return response

    def delete(self, request):
        if request.user is None or not request.user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)

        logout(request)
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

                if not EmailService.send_reset_email(user.email, token.token):
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
    
class OwnerCreateView(APIView):
    serializer_class = OwnerCreateSerializer

    def get(self, request):
        establishments = Establishment.objects.all()
        serializer = OwnerEstablishmentSerializer(establishments, many=True)
        return Response({"establishments" : serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = OwnerCreateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        validated_data = serializer.validated_data

        with transaction.atomic():
            user = User.objects.create(
                username=validated_data['email'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                email=validated_data['email'],
                is_staff=False,
                is_active=False,
                is_superuser=False
            )
            user.set_password(validated_data['password'])
            user.save()

            restaurant = RestaurationPlace.objects.create(
                name=validated_data['name'],
                description=validated_data['description'],
                location=validated_data['location'],
                restauration_type=validated_data['restauration_type'],
                opening_time=validated_data['opening_time'],
                closing_time=validated_data['closing_time'],
                phone=validated_data['phone_restaurant'],
                photo_link=validated_data.get('photo_link', None),
                status=False,
                is_valid=False
            )

            user_meta = UserMeta.objects.create(
                user=user,
                is_owner=True,
                is_verified=False,
                role=f"Restaurateur chez {restaurant.name}",
                phone=validated_data.get('phone', None),
            )

            WorkIn.objects.create(
                user=user,
                restaurant=restaurant,
                role="Chef.fe du restaurant"
            )

            link_to_objects = [
                LinkTo(establishment_id=est_id, restaurant=restaurant, status=False)
                for est_id in validated_data['establishments']
            ]
            LinkTo.objects.bulk_create(link_to_objects)

        return Response({"message": "Votre demande a bien été envoyé."}, status=status.HTTP_201_CREATED)
