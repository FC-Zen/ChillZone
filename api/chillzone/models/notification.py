from django.db import models
from django.contrib.auth.models import User

class Notification(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    reservation = models.BooleanField(default=True)

    event = models.BooleanField(default=True)

    command = models.BooleanField(default=True)