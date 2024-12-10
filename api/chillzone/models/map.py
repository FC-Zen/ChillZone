from django.db import models
from .establishment import Establishment

class Map(models.Model) :

    name = models.CharField(max_length= 255)
    
    creation_date = models.DateTimeField
    
    modification_date = models.DateTimeField

    id_establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE)