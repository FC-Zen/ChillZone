from django.db import models 

class CommandLine(models.Model):

    quantity = models.IntegerField()

    command = models.ManyToManyField('Command',through='CommandComposition', related_name='command')

    menu = models.ManyToManyField('Menu',through='LineContent', related_name='menu')