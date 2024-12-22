from django.db import models
from chillzone.models import Notification, UserMeta 

class NotificationCenter(models.Model):

    user = models.ForeignKey(UserMeta, on_delete=models.CASCADE) 
    
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user' , 'notification'], name='unique_user_notification'
            )
        ]