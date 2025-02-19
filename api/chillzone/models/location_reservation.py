from django.db import models
from chillzone.models import Reservation, Location

class LocationReservation(models.Model):

    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)

    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    start_time = models.TimeField()

    end_time = models.TimeField()

    day_reservation = models.DateField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['location', 'day_reservation', 'start_time', 'end_time'], name='unique_location_reservation'
            )
        ]