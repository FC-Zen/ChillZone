import string
import re
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.core.validators import RegexValidator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk','username', 'last_login', 'is_superuser', 'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined']

class UserLoginSerializer(serializers.Serializer):

    login = serializers.CharField()

    password = serializers.CharField()

class PasswordResetEmailSerializer(serializers.Serializer):

    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No account associated with this email.")
        return value
    
class UserInfoSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source='usermeta.phone', max_length=10, required=False)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone']
    
class UserInfoUpdateSerializer(serializers.Serializer):

    first_name = serializers.CharField(max_length=150, required=False)

    last_name = serializers.CharField(max_length=150, required=False)

    phone = serializers.CharField(max_length=10, required=False)

    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.filter(email=value).exclude(id=user.id).exists():
            raise serializers.ValidationError("This email is already associated with another account.")
        return value

class PasswordChangeSerializer(serializers.Serializer):
    password_actual = serializers.CharField(max_length=128)

    special_characters = string.punctuation

    password = serializers.CharField(
        write_only=True,
        validators=[
            RegexValidator(
                regex=r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[' + re.escape(special_characters) + r'])[A-Za-z\d' + re.escape(special_characters) + r']{12,}$',
                message='Le mot de passe doit contenir au moins 12 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.'
            )
        ]
    )

    password_verified = serializers.CharField(
        write_only=True,
        validators=[
            RegexValidator(
                regex=r'.+',
                message='Le mot de passe vérifié ne peut pas être vide.'
            )
        ]
    )

    def validate(self, data):
        if data['password'] != data['password_verified']:
            raise serializers.ValidationError({"password_verified": "Les mots de passe ne correspondent pas."})
        return data
    
class PasswordResetSerializer(serializers.Serializer):
    special_characters = string.punctuation

    password = serializers.CharField(
        write_only=True,
        validators=[
            RegexValidator(
                regex=r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[' + re.escape(special_characters) + r'])[A-Za-z\d' + re.escape(special_characters) + r']{12,}$',
                message='Le mot de passe doit contenir au moins 12 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.'
            )
        ]
    )

    password_verified = serializers.CharField(
        write_only=True,
        validators=[
            RegexValidator(
                regex=r'.+',
                message='Le mot de passe vérifié ne peut pas être vide.'
            )
        ]
    )

    def validate(self, data):
        if data['password'] != data['password_verified']:
            raise serializers.ValidationError({"password_verified": "Les mots de passe ne correspondent pas."})
        return data

class UserCreateSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=150,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    role = serializers.CharField(max_length=254)
    is_admin = serializers.BooleanField()

class OwnerCreateSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=150,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    phone = serializers.CharField(
        max_length=10, 
        min_length=10,
        validators=[
            RegexValidator(
                regex=r'^\d{10}$', 
                message='Le numéro de téléphone doit contenir exactement 10 chiffres.'
            )
        ]
    )

    special_characters = string.punctuation

    password = serializers.CharField(
        write_only=True,
        validators=[
            RegexValidator(
                regex=r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[' + re.escape(special_characters) + r'])[A-Za-z\d' + re.escape(special_characters) + r']{12,}$',
                message='Le mot de passe doit contenir au moins 12 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.'
            )
        ]
    )

    password_verified = serializers.CharField(
        write_only=True,
        validators=[
            RegexValidator(
                regex=r'.+',
                message='Le mot de passe vérifié ne peut pas être vide.'
            )
        ]
    )

    def validate(self, data):
        if data['password'] != data['password_verified']:
            raise serializers.ValidationError({"password_verified": "Les mots de passe ne correspondent pas."})
        return data

class AdminUserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='usermeta.role')
    establishment = serializers.CharField(source='usermeta.establishment.name', allow_null=True)
    reservation_count = serializers.IntegerField()
    is_block = serializers.BooleanField(source='usermeta.is_block')

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'role', 'establishment', 'reservation_count', 'is_block', 'is_active']