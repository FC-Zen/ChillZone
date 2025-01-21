from django.db import models
from chillzone.models import Map 

class MapFloor(models.Model):

    number = models.PositiveSmallIntegerField()

    name = models.CharField(max_length=100)

    photo_link = models.ImageField(blank=True, null=False)

    creation_date = models.DateTimeField(auto_now_add=True) 

    modification_date = models.DateTimeField(auto_now=True) 
    
    map = models.ForeignKey( Map, on_delete=models.CASCADE )
