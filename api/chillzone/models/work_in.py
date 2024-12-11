from django.db import models 
from django.contrib.auth.models import User
from chillzone.models import RestaurationPlace

class WorkIn(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, primary_key=True)

    restaurant = models.ForeignKey(RestaurationPlace, on_delete=models.CASCADE, primary_key=True)

    role = models.CharField(max_length=100)