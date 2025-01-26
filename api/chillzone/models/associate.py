from django.db import models 
from chillzone.models import Menu, Type

class Associate(models.Model):

    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)

    type = models.ForeignKey(Type, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['menu', 'type'], name='unique_menu_type'
            )
        ]