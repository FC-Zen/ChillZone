from rest_framework import serializers
from chillzone.models import Event

class EventSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Event
        fields = ['id', 'title', 'start_time', 'end_time', 'location', 'description']