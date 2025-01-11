from django.db import models
from django.contrib.auth.models import User
import uuid

class Token(models.Model):
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    expiration_date = models.DateTimeField()
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="token")
    
    def __str__(self):
        return f"Token for {self.user.username}"
