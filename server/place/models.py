from django.db import models


class Place(models.Model):
    xid = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    point = models.CharField(max_length=255)
    description = models.TextField()

