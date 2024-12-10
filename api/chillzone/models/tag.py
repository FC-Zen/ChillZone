from django.db import models
from .tag_category import TagCategory

class Tag(models.Model) :
    
    libelle = models.CharField(max_length= 50)

    description = models.TextField(blank=True)

    id_tag_category = models.ForeignKey(TagCategory, on_delete=models.CASCADE)