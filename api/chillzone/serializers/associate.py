from rest_framework import serializers
from chillzone.models import Associate
from django.db import models

class AssociateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Associate
        fields = ['menu', 'category']