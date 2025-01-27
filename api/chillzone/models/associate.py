from django.db import models 
from chillzone.models import Menu, Type, Category

class Associate(models.Model):

    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)

    type = models.ForeignKey(Type, on_delete=models.CASCADE)

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['menu', 'type', 'category'], name='unique_menu_type_category'
            )
        ]