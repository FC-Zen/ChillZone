from django.shortcuts import get_object_or_404
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from chillzone.models import RestaurationPlace
from chillzone.serializers import RestaurationPlaceSerializer
from chillzone.filters import RestaurationPlaceFilter

class RestaurationPlaceView(APIView) :

    def get(self, request, id_restaurant):
        restaurant = get_object_or_404(RestaurationPlace, pk=id_restaurant)
        serializer = RestaurationPlaceSerializer(restaurant)
        return Response(serializer.data)
    
    def post(self, resquest, id_restaurant):
        restaurant = get_object_or_404(RestaurationPlace, pk=id_restaurant)
        serializer = RestaurationPlaceSerializer(restaurant, data= resquest.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else :
            return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
        
    def delete(self, resquest, id_restaurant):
        restaurant = get_object_or_404(RestaurationPlace, pk=id_restaurant)
        restaurant.delete()
        return Response(status= status.HTTP_204_NO_CONTENT)
    
class RestaurationPlacesView(APIView) :

    def get(self, request):
        filter = RestaurationPlaceFilter(request.GET, queryset=RestaurationPlace.objects.prefetch_related('establishment_set'))

        places = filter.qs

        serializer = RestaurationPlaceSerializer(places, many=True)
        return Response(serializer.data)
        
    def post(self, resquest):
        serializer = RestaurationPlaceSerializer(None, data= resquest.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)