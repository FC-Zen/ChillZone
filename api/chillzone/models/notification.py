from django.db import models

class Notification(models.Model):
    title = models.CharField(max_length=254)
    description = models.TextField(null=True, blank=True)