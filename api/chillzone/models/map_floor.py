from django.db import models
from .map import Map

class MapFloor(models.Model) :

    number = models.BooleanField(default=False)
    
    name = models.CharField(max_length= 100)
    
    photo_link = models.CharField(max_length= 300)

    creation_date = models.DateTimeField
    
    modification_date = models.DateTimeField

    id_map = models.ForeignKey(Map, on_delete=models.CASCADE)