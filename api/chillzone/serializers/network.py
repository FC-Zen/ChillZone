from rest_framework import serializers
from chillzone.models import Network

class NetworkSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Network
        fields = ['pk', 'type', 'link_network']