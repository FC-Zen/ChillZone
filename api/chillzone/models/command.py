from django.db import models 
from django.contrib.auth.models import User
from chillzone.models import RestaurationPlace
from django.utils.timezone import now, timedelta

class Command(models.Model):

    STATUS_CHOICES = [
        ('in progress', 'In progress'),
        ('ready', 'Ready'),
        ('completed', 'Completed'),
    ]
    
    payment_method = models.CharField(max_length=50)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='in progress')
    qrcode_link = models.ImageField(upload_to='qrcodes/', blank=True)
    pickup_time = models.TimeField(null=False, default="00:00:00")
    creation_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    restauration_place = models.ForeignKey(RestaurationPlace, on_delete=models.CASCADE)