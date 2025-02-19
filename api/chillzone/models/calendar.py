from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Calendar(models.Model):

    title = models.CharField(max_length=50)

    url = models.TextField(null=True, blank=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE )

    reload = models.DateTimeField(auto_now_add=True)
