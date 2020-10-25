from django.db import models
from django.contrib.auth.models import User


class Trip(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    users = models.ManyToManyField(User, related_name="users_Trips", blank=True)
