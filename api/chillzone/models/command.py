from django.db import models 
from chillzone.models import UserMeta, RestaurationPlace

class Command(models.Model):

    STATUS_CHOICES = [
        ('In progress', 'In progress'),
        ('Ready', 'Ready'),
        ('Completed', 'Completed'),
    ]
    
    payment_method = models.CharField(max_length=50)

    total_amount = models.FloatField

    status = models.CharField(max_length=15, choices=STATUS_CHOICES)

    qrcode_link = models.TextField

    pickup_time = models.TimeField

    creation_date = models.DateTimeField(auto_now_add=True)

    user = models.ForeignKey(UserMeta, on_delete=models.CASCADE)

    restauration_place = models.ForeignKey(RestaurationPlace, on_delete=models.CASCADE)
