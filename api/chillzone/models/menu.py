from django.db import models 
from chillzone.models import RestaurationPlace

class Menu(models.Model):

    name = models.CharField(max_length=254)

    description = models.TextField()

    photo_link = models.ImageField(upload_to='menu/', null=True, blank=True)

    price = models.FloatField()

    creation_date = models.DateTimeField(auto_now_add=True)

    modification_date = models.DateTimeField(auto_now=True)

    restaurant = models.ForeignKey(RestaurationPlace, on_delete=models.CASCADE)

    meal = models.ManyToManyField('Meal',through='LineContent', related_name='meal')