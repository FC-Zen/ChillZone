from rest_framework import serializers
from chillzone.models import Associate
from django.db import models

class AssociateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Associate
        constraints = [
            models.UniqueConstraint(
                fields=['menu', 'category'], name='unique_menu_category'
            )
        ]
        fields = ['menu', 'category']