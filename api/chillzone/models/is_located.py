from django.db import models
from chillzone.models import Establishment, Location

class IsLocated(models.Model):

    establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE)

    location = models.ForeignKey(Location, on_delete=models.CASCADE)