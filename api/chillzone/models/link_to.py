from django.db import models 
from chillzone.models import Establishment, RestaurationPlace

class LinkTo(models.Model):

    establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE)

    restaurant = models.ForeignKey(RestaurationPlace, on_delete=models.CASCADE)

    status = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['establishment', 'restaurant'], name='unique_establishment_restaurant'
            )
        ]