from django.db import models
from django.contrib.auth.models import User
from chillzone.models import Establishment

class UserMeta(models.Model):

    class Meta:
        db_table = "auth_user_meta"

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    is_owner =  models.BooleanField(default=False)

    is_block = models.BooleanField(default=False)
    
    is_verified = models.BooleanField(default=False)

    role = models.CharField(max_length=254, blank=False, default="Etudiant")

    phone = models.CharField(max_length=10, blank=True, null=True)

    photo_link = models.ImageField(upload_to='user/', blank=True, default="user/DefaultProfile.png")

    establishment = models.ForeignKey(Establishment, on_delete=models.SET_NULL, blank=True, null=True)

    notification = models.ManyToManyField('Notification',through='NotificationCenter', related_name='notifications')