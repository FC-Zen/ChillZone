from rest_framework import serializers
from chillzone.models import FAQ

class FAQSerializer(serializers.ModelSerializer) :
    class Meta:
        model = FAQ
        fields = ['pk', 'category', 'question', 'answer']