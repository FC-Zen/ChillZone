from django.db import models
from chillzone.models import Establishment

class Network(models.Model) :

    TYPE_CHOICES = [
        ("facebook", "Facebook"),
        ("x", "X"),
        ("instagram", "Instagram"),
        ("youtube", "Youtube"),
        ("linkedin", "LinkedIn"),
        ("workspace", "Workspace"),
        ("website", "Website"),
    ]

    type = models.CharField(max_length= 30 , choices= TYPE_CHOICES)

    link_network = models.TextField()

    establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE)