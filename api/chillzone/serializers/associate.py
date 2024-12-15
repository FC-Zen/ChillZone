from rest_framework import serializers
from chillzone.models import Associate

class AssociateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Associate
        unique_together = ("menu", "category")
        fields = ['menu', 'category']