from django.db import models
from chillzone.models import UserMeta  
from chillzone.models import Notification  

class NotificationCenter(models.Model):
    user = models.ForeignKey(UserMeta, on_delete=models.CASCADE) 
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)