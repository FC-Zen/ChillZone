from rest_framework import serializers
from chillzone.models import Conflict, LocationReservation

class ConflictSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Conflict
        fields = ['user', 'reservation', 'comment']

class AdminConflictSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    location_name = serializers.SerializerMethodField()
    day_reservation = serializers.SerializerMethodField()

    class Meta:
        model = Conflict
        fields = ['id', 'day_reservation', 'full_name', 'location_name', 'comment']

    def get_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

    def get_location_name(self, obj):
        location_reservation = LocationReservation.objects.filter(reservation=obj.reservation).first()
        if location_reservation:
            return location_reservation.location.name
        return None

    def get_day_reservation(self, obj):
        location_reservation = LocationReservation.objects.filter(reservation=obj.reservation).first()
        if location_reservation:
            return location_reservation.day_reservation
        return None