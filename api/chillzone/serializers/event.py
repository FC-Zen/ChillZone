from rest_framework import serializers
from chillzone.models import Event

class EventSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Event
        fields = ['pk', 'title', 'start_time', 'end_time', 'location', 'description']