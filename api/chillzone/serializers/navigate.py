from rest_framework import serializers
from chillzone.models import Navigate

class NavigateSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Navigate
        unique_together = ("location_start", "location_end")
        fields = ['location_start', 'location_end', 'link_photo', 'position_x_photo']