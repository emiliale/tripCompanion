from django.db import models


class Place(models.Model):
    xid = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    lng = models.FloatField(default=0)
    lat = models.FloatField(default=0)
    duration = models.IntegerField(default=0)
    distance = models.FloatField(default=0)
