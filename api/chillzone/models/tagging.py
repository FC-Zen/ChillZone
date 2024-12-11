from django.db import models 
from chillzone.models import Meal, Tag

class Tagging(models.Model):

    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, primary_key=True)

    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, primary_key=True)
