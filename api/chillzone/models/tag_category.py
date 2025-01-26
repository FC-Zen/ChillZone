from django.db import models

class TagCategory(models.Model) :
    
    label = models.CharField(max_length= 254)