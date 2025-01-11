from rest_framework import serializers
from chillzone.models import FAQ

class FAQSerializer(serializers.ModelSerializer) :
    class Meta:
        model = FAQ
        fields = ['pk', 'category', 'question', 'answer']

class AdminFAQSerializer(serializers.ModelSerializer):
    category = serializers.CharField(max_length=255)
    question = serializers.CharField(max_length=255)
    answer = serializers.CharField(max_length=1000)

    class Meta:
        model = FAQ
        fields = ['pk', 'category', 'question', 'answer']