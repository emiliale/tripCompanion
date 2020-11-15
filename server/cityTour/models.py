from django.db import models
from django.contrib.auth.models import User
from place.models import Place
from trip.models import Trip
import datetime


class CityTour(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255, default="")
    distance = models.FloatField(default=0)
    date = models.DateField(default=datetime.datetime.now().date())
    country = models.CharField(max_length=255, default="")
    continent = models.CharField(max_length=255, default="")
    trip = models.ForeignKey(
        Trip,
        related_name="trips_cityTours",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    users = models.ManyToManyField(User, related_name="users_cityTours", blank=True)
    places = models.ManyToManyField(Place, related_name="places_cityTours", blank=True)
