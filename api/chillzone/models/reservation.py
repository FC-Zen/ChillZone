from django.db import models
from django.contrib.auth.models import User

class Reservation(models.Model):

    STATUS_CHOICES = [
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
        ('Ongoing', 'Ongoing'),
        ('Pending', 'Pending')
    ]

    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')

    creation_date = models.DateTimeField(auto_now_add=True)

    modification_date = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)