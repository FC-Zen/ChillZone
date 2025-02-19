from django.db import models
from chillzone.models import Calendar  

class Event(models.Model):

    id = models.CharField(primary_key=True, max_length=58, unique=True)

    title = models.CharField(max_length=254)  

    start_time = models.DateTimeField(null=True, blank=True)
    
    end_time = models.DateTimeField(null=True, blank=True)

    location = models.CharField(max_length=254, null=True, blank=True) 

    description = models.TextField(null=True, blank=True)  

    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE, related_name="events")