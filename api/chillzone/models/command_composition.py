from django.db import models 
from chillzone.models import Command, CommandLine

class CommandComposition(models.Model):

    command = models.ForeignKey(Command, on_delete=models.CASCADE)

    line = models.ForeignKey(CommandLine, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['command', 'line'], name='unique_command_line'
            )
        ]
