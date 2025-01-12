from rest_framework import serializers
from chillzone.models import RestaurationPlace

class OpenRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurationPlace
        fields = ['name', 'description', 'location', 'restauration_type', 'opening_time', 'closing_time', 'photo_link']

class AdminConfirmedRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurationPlace
        fields = ['id', 'name', 'restauration_type', 'location', 'email', 'status']

class AdminPendingRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurationPlace
        fields = ['id', 'name', 'restauration_type', 'location', 'email']