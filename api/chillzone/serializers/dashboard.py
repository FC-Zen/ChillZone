from rest_framework import serializers
from django.db.models import Count
from django.contrib.auth.models import User
from chillzone.models import LocationReservation, Location, LinkTo, Reservation, Conflict
from django.utils import timezone
from datetime import timedelta

class ReservationSerializer(serializers.Serializer):
    month = serializers.CharField()
    count = serializers.IntegerField()

class UserSerializer(serializers.Serializer):
    month = serializers.CharField()
    count = serializers.IntegerField()

class LocationAvailabilitySerializer(serializers.Serializer):
    count = serializers.IntegerField()

class RestaurantAvailabilitySerializer(serializers.Serializer):
    count = serializers.IntegerField()

class DashboardSerializer(serializers.Serializer):
    reservations_per_month_current_year = ReservationSerializer(many=True)
    reservations_per_month_previous_year = ReservationSerializer(many=True)
    connections_per_month_current_year = UserSerializer(many=True)
    connections_per_month_previous_year = UserSerializer(many=True)
    users_current_year = serializers.IntegerField()
    users_previous_year = serializers.IntegerField()
    users_percentage_change = serializers.FloatField()
    reports_current_month = serializers.IntegerField()
    reports_percentage_change = serializers.FloatField()
    available_locations = LocationAvailabilitySerializer()
    available_restaurants = RestaurantAvailabilitySerializer()
