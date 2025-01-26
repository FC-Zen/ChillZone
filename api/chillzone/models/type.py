from django.db import models

class Type(models.Model):

    TYPE_CHOICES = [
        ('starter', 'Starter'),
        ('main', 'Main'),
        ('dessert', 'Dessert'),
        ('side', 'Side'),
        ('drink', 'Drink'),
        ('other', 'Other'),
    ]

    label = models.CharField(max_length=10, choices=TYPE_CHOICES)

    menu = models.ManyToManyField('Menu',through='Associate', related_name='menu_id')