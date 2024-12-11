from rest_framework import serializers
from chillzone.models import Establishment

class EstablishmentSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Establishment
        fields = ['pk', 'name', 'address', 'city', 'postalCode', 'phone', 'mail']