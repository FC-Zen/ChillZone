from rest_framework import serializers
from chillzone.models import NotificationCenter
from django.db import models

class NotificationCenterSerializer(serializers.ModelSerializer) :
    class Meta:
        model = NotificationCenter
        constraints = [
            models.UniqueConstraint(
                fields=['user' , 'notification'], name='unique_user_notification'
            )
        ]
        fields = ['pk' , 'user' , 'notification']