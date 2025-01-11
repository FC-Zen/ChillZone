from rest_framework import serializers
from chillzone.models import Conflict

class ConflictSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Conflict
        fields = ['user', 'reservation', 'comment']

class AdminConflictSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    location_name = serializers.CharField(source='reservation.locationreservation.location.name')

    class Meta:
        model = Conflict
        fields = ['id', 'day_reservation', 'full_name', 'location_name', 'comment']

    def get_full_name(self, obj):
        return f"{obj.user.user.first_name} {obj.user.user.last_name}"
