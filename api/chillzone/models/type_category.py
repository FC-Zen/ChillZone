from django.db import models 
from chillzone.models import Type, Category

class TypeCategory(models.Model):

    type = models.ForeignKey(Type, on_delete=models.CASCADE)

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['type', 'category'], name='unique_type_category'
            )
        ]