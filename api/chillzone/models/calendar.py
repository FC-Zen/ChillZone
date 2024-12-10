from django.db import models
from chillzone.models import UserMeta

class Calendar(models.Model):
    title = models.CharField(max_length=50)  
    import_link = models.TextField(null=True, blank=True)  
    description = models.TextField(null=True, blank=True)
    user = models.ForeignKey(UserMeta, on_delete=models.CASCADE )