from django.db import models
from chillzone.models import Establishment 

class FAQ(models.Model):
    
    category = models.CharField(max_length=254) 

    question = models.TextField

    answer = models.TextField

    establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE)