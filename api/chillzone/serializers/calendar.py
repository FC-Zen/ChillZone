from rest_framework import serializers
from chillzone.models import Calendar

class CalendarSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Calendar
        fields = ['pk', 'title', 'import_link', 'description', 'user']