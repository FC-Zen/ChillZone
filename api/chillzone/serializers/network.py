from rest_framework import serializers
from chillzone.models import Network

class NetworkSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Network
        fields = ['id', 'type', 'link_network']

class AdminNetworkSerializer(serializers.ModelSerializer):
    type = serializers.CharField(max_length=30)
    link_network = serializers.URLField()

    class Meta:
        model = Network
        fields = ['id', 'type', 'link_network']