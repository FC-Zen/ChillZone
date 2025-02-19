from rest_framework import serializers
from chillzone.models import Notification

class NotificationSerializer(serializers.ModelSerializer) :
    
    class Meta:
        model = Notification
        fields = ['command' , 'reservation', 'event']