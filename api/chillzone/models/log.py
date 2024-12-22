from django.db import models
from django.contrib.auth.models import User

class Log(models.Model):

    date_log = models.DateTimeField(auto_now_add=True)

    content = models.CharField(max_length=254) 
    
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
