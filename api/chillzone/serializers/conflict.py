from rest_framework import serializers
from chillzone.models import Conflict

class ConflictSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Conflict
        fields = ['user', 'reservation', 'comment']