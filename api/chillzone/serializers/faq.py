from rest_framework import serializers
from chillzone.models import Faq

class FaqSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Faq
        fields = ['pk', 'category', 'question', 'answer']