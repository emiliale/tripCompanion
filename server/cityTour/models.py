from django.db import models
from django.contrib.auth.models import User
from place.models import Place
from trip.models import Trip
import datetime


class CityTour(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255, null=True, blank=True)
    distance = models.FloatField(default=0, null=True, blank=True)
    date = models.DateField(default=datetime.datetime.now().date())
    country = models.CharField(max_length=255, default="", null=True, blank=True)
    continent = models.CharField(max_length=255, default="", null=True, blank=True)
    trip = models.ForeignKey(
        Trip,
        related_name="trips_cityTours",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    places = models.ManyToManyField(Place, related_name="places_cityTours", blank=True)


class CityTourTemplate(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255, null=True, blank=True)
    distance = models.FloatField(default=0, null=True, blank=True)
    country = models.CharField(max_length=255, default="", null=True, blank=True)
    continent = models.CharField(max_length=255, default="", null=True, blank=True)
    places = models.ManyToManyField(
        Place, related_name="places_cityToursTemplates", blank=True
    )
