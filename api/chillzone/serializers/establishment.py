from rest_framework import serializers
from chillzone.models import Establishment

class AdminEstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = ['id', 'name', 'address', 'city', 'postalCode', 'phone', 'mail']

class OwnerEstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = ['id', 'name']