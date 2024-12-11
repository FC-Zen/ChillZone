from django.db import models
from chillzone.models import UserAccount, Reservation

class Conflict(models.Model):

    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, primary_key=True)
    
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE, primary_key=True)
    
    comment = models.TextField(null=True, blank=True)