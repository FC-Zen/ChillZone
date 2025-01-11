from django.db import models 

class Category(models.Model):
    
    label = models.CharField(max_length=50)

    description = models.CharField(max_length=254, null=True)