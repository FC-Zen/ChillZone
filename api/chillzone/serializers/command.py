from rest_framework import serializers
from chillzone.models import Command

class CommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Command
        fields = ['pk', 'payment_method', 'total_amount', 'status', 'qrcode_link', 'pickup_time', 'creation_date', 'user', 'restauration_place']