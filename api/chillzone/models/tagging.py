from django.db import models 
from chillzone.models import Meal, Tag

class Tagging(models.Model):

    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)

    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['meal', 'tag'], name='unique_meal_tag'
            )
        ]
