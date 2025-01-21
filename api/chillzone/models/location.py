from django.db import models
from chillzone.models import Tag
from chillzone.models import MapFloor

class Location(models.Model) :
    
    name = models.CharField(max_length= 100)
    
    photo_link = models.ImageField(null=True, blank=True)

    description = models.TextField(blank=True, null=True)

    capacity = models.IntegerField()

    status = models.BooleanField(default=False)
    
    qrcode_link = models.ImageField(upload_to='qrcodes/', null=True, blank=True)

    position_x = models.IntegerField()

    position_y = models.IntegerField()

    creation_date = models.DateTimeField(auto_now_add=True)
    
    modification_date = models.DateTimeField(auto_now=True) 

    id_type = models.ForeignKey(Tag, on_delete=models.CASCADE)

    id_floor = models.ForeignKey(MapFloor, on_delete=models.CASCADE)