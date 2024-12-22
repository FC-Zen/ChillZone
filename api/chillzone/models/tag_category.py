from django.db import models

class TagCategory(models.Model) :
    
    libelle = models.CharField(max_length= 254)