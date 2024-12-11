from django.db import models 
from chillzone.models import Menu, Meal, CommandLine

class LineContent(models.Model):

    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, primary_key=True)

    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, primary_key=True)

    line = models.ForeignKey(CommandLine, on_delete=models.CASCADE, primary_key=True)
