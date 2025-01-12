from django.db import models
from chillzone.models import TagCategory

class Tag(models.Model) :
    
    libelle = models.CharField(max_length= 50)

    description = models.TextField(blank=True, null=True)

    id_tag_category = models.ForeignKey(TagCategory, on_delete=models.CASCADE)