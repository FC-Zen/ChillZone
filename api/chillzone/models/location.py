from django.db import models
from .tag import Tag
from .map_floor import MapFloor

class Location(models.Model) :
    
    name = models.CharField(max_length= 100)
    
    photo_link = models.TextField(blank=True)

    description = models.TextField(blank=True)

    capacity = models.IntegerField

    status = models.BooleanField(default=False)

    position_x = models.IntegerField

    position_y = models.IntegerField

    creation_date = models.DateTimeField
    
    modification_date = models.DateTimeField

    id_tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    id_floor = models.ForeignKey(MapFloor, on_delete=models.CASCADE)