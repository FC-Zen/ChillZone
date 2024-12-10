from rest_framework import serializers
from chillzone.models import Log

class LogSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Log
        fields = ['pk', 'date_log']