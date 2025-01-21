from django.db import models 
from chillzone.models import RestaurationPlace, Category

class Meal(models.Model):

    TYPE_CHOICES = [
        ('starter', 'Starter'),
        ('main', 'Main'),
        ('dessert', 'Dessert'),
        ('side', 'Side'),
        ('drinks', 'Drinks'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=254)

    description = models.TextField()

    type = models.CharField(max_length=10, choices=TYPE_CHOICES)

    photo_link = models.ImageField(null=True, blank=True)

    price = models.FloatField(default=0.0)

    stock = models.IntegerField(default=0)

    modification_date = models.DateTimeField(auto_now=True)

    creation_date = models.DateTimeField(auto_now_add=True)

    restaurant = models.ForeignKey(RestaurationPlace, on_delete=models.CASCADE)

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    tag = models.ManyToManyField('Tag',through='Tagging', related_name='tag')
