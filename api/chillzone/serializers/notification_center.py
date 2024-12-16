from rest_framework import serializers
from chillzone.models import NotificationCenter

class NotificationCenterSerializer(serializers.ModelSerializer) :
    class Meta:
        model = NotificationCenter
        fields = ['pk' , 'user' , 'notification']