from rest_framework import serializers
from chillzone.models import RestaurationPlace

from chillzone.serializers import EstablishmentSerializer

class RestaurationPlaceSerializer(serializers.ModelSerializer) :

    establishment_set = EstablishmentSerializer(many=True)

    class Meta:
        model = RestaurationPlace
        fields = ['pk', 'name', 'description', 'location', 'restauration_type', 'opening_time', 'closing_time', 'status', 'email', 'photo_link', 'establishment_set']