from django.db import models
from chillzone.models import UserMeta, Reservation

class Conflict(models.Model):

    user = models.ForeignKey(UserMeta, on_delete=models.CASCADE)
    
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    
    comment = models.TextField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'reservation'], name='unique_user_reservation'
            )
        ]