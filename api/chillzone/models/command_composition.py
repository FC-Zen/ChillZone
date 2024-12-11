from django.db import models 
from chillzone.models import Command, CommandLine

class CommandComposition(models.Model):

    command = models.ForeignKey(Command, on_delete=models.CASCADE, primary_key=True)

    line = models.ForeignKey(CommandLine, on_delete=models.CASCADE, primary_key=True)
