from django.db import models
from chillzone.models import Location

class Navigate(models.Model):

    location_start = models.ForeignKey( Location, on_delete=models.CASCADE, related_name="navigates_as_start")

    location_end = models.ForeignKey( Location, on_delete=models.CASCADE, related_name="navigates_as_end")
    
    link_photo = models.TextField

    position_x_photo = models.IntegerField

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["location_start", "location_end"], name='unique_locationStart_locationEnd'
            )
        ]