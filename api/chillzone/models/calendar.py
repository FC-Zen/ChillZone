from django.db import models
from django.contrib.auth.models import User

class Calendar(models.Model):
    title = models.CharField(max_length=50)  
    import_link = models.TextField(null=True, blank=True)  
    description = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE )
