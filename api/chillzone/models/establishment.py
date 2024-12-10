from django.db import models
from .restauration_place import RestaurationPlace
from django.contrib.auth.models import User

class Establishment(models.Model) :
    
    name = models.CharField(max_length= 254)

    address = models.TextField

    city = models.CharField(max_length= 254)

    postalCode = models.CharField(max_length= 5)

    phone = models.CharField(max_length= 10)

    mail = models.EmailField(max_length= 254)

    creation_date = models.DateTimeField(auto_now_add=True)

    modification_date = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    restaurants = models.ManyToManyField(RestaurationPlace)                 # Pour personnaliser il faut créer un model correspondant à la table
