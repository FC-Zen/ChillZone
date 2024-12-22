from django.db import models
from chillzone.models import Establishment

class Map(models.Model) :

    name = models.CharField(max_length=254)
    
    creation_date = models.DateTimeField(auto_now_add=True)
    
    modification_date = models.DateTimeField(auto_now=True) 
    
    establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE)
