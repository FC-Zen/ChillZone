from rest_framework import serializers
from django.contrib.auth.models import User
from chillzone.models import UserMeta

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['pk','username', 'last_login', 'is_superuser', 'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined']

class UserLoginSerializer(serializers.Serializer):

    login = serializers.CharField()

    password = serializers.CharField()

class UserCreateSerializer(serializers.Serializer):

    username = serializers.CharField()

    email = serializers.EmailField()

class UserPasswordSerializer(serializers.Serializer):

    password = serializers.CharField()

    confirm_password = serializers.CharField()