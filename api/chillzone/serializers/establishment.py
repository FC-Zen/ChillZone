from rest_framework import serializers
from chillzone.models import Establishment

class AdminEstablishmentSerializer(serializers.ModelSerializer):

    phone = serializers.CharField(required=False, max_length=10, min_length=10)
    postalCode = serializers.CharField(required=False, max_length=5, min_length=5)
    class Meta:
        model = Establishment
        fields = ['id', 'name', 'address', 'city', 'postalCode', 'phone', 'mail']

class OwnerEstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = ['id', 'name']
