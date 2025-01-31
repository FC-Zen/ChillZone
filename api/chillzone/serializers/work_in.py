from rest_framework import serializers
from chillzone.models import WorkIn
from chillzone.models import user_meta
from chillzone.models import RestaurationPlace

class WorkInSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkIn
        fields = ['user', 'restaurant', 'role']
        
class RestaurantRegisterRequestSerializer(serializers.ModelSerializer):
    '''
    Serializer pour lister les demandes d'affiliation des lieux de restauration.
    '''
    id = serializers.IntegerField(source='user.id')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.CharField(source='user.email')
    phone = serializers.CharField(source='user.usermeta.phone')
    restaurant_name = serializers.CharField(source='restaurant.name')
    restaurant_location = serializers.CharField(source='restaurant.location')

    class Meta:
        model = WorkIn
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'restaurant_name',
            'restaurant_location'
        ]