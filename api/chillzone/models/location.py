from django.db import models
from chillzone.models import Tag
from chillzone.models import MapFloor

class Location(models.Model) :
    
    name = models.CharField(max_length= 100)
    
    photo_link = models.TextField(blank=True, null=True)

    description = models.TextField(blank=True, null=True)

    capacity = models.IntegerField()

    status = models.BooleanField(default=False)

    position_x = models.IntegerField()

    position_y = models.IntegerField()

    creation_date = models.DateTimeField(auto_now_add=True)
    
    modification_date = models.DateTimeField(auto_now=True) 

    id_tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    id_floor = models.ForeignKey(MapFloor, on_delete=models.CASCADE)