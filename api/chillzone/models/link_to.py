from django.db import models 
from chillzone.models import Establishment, RestaurationPlace

class LinkTo(models.Model):

    establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE)

    restaurant = models.ForeignKey(RestaurationPlace, on_delete=models.CASCADE)