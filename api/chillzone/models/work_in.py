from django.db import models 
from django.contrib.auth.models import User
from chillzone.models import RestaurationPlace

class WorkIn(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    restaurant = models.ForeignKey(RestaurationPlace, on_delete=models.CASCADE)

    role = models.CharField(max_length=100)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'restaurant'], name='unique_user_restaurant'
            )
        ]