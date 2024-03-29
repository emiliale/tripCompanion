# Generated by Django 3.1.1 on 2020-11-29 16:28

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cityTour", "0007_auto_20201129_1617"),
    ]

    operations = [
        migrations.CreateModel(
            name="CityTourTemplate",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("city", models.CharField(blank=True, max_length=255, null=True)),
                ("distance", models.FloatField(blank=True, default=0, null=True)),
                ("date", models.DateField(default=datetime.date(2020, 11, 29))),
                (
                    "country",
                    models.CharField(blank=True, default="", max_length=255, null=True),
                ),
                (
                    "continent",
                    models.CharField(blank=True, default="", max_length=255, null=True),
                ),
            ],
        ),
    ]
