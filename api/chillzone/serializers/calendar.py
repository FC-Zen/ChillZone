from rest_framework import serializers
from chillzone.models import Calendar
from chillzone.serializers import EventSerializer

class CalendarSerializer(serializers.ModelSerializer) :
    events = EventSerializer(many=True, read_only=True)

    class Meta:
        model = Calendar
        fields = ['id', 'title', 'url', 'events']

class UpdateCalendarSerializer(serializers.ModelSerializer) :
    url = serializers.CharField()

    class Meta:
        model = Calendar
        fields = ['url']