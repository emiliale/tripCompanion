from django.db import models
from django.contrib.auth.models import User
from place.models import Place
from trip.models import Trip


class CityTour(models.Model):
    name = models.CharField(max_length=255)
    trip = models.ManyToManyField(Trip, related_name="trips_cityTours", blank=True)
    users = models.ManyToManyField(User, related_name="users_cityTours", blank=True)
    places = models.ManyToManyField(Place, related_name="places_cityTours", blank=True)


