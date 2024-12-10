from django.db import models
from chillzone.models import UserMeta

class Log(models.Model):
    date_log = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=254) 
    user = models.ForeignKey(UserMeta, on_delete=models.CASCADE) 