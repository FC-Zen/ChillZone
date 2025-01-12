from django.db import models

class RestaurationPlace(models.Model):

    TYPE_CHOICES = [
        ("restaurant", "Restaurant"),
        ("fridge", "Réfrégirateur")
    ]

    name = models.CharField(max_length= 254)

    description = models.TextField(blank=True)

    location = models.CharField(max_length= 254)

    restauration_type = models.CharField(choices=TYPE_CHOICES, max_length= 25)

    opening_time = models.TimeField()

    closing_time = models.TimeField()

    status = models.BooleanField(default=False)

    email = models.EmailField()

    photo_link = models.ImageField(null=True, blank=True)

    creation_date = models.DateTimeField(auto_now_add=True)
    
    modification_date = models.DateTimeField(auto_now=True)