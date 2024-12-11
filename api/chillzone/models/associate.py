from django.db import models 
from chillzone.models import Menu, Category

class Associate(models.Model):

    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, primary_key=True)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, primary_key=True)