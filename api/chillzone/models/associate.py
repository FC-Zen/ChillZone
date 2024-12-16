from django.db import models 
from chillzone.models import Menu, Category

class Associate(models.Model):

    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['menu', 'category'], name='unique_menu_category'
            )
        ]