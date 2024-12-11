from django.db import models
from django.contrib.auth.models import User
from chillzone.models import Notification  

class NotificationCenter(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)