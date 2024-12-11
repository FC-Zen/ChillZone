from rest_framework import serializers
from chillzone.models import Reservation

class ReservationSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Reservation
        fields = ['pk' , 'status' , 'creation_date', 'modification_date', 'user']