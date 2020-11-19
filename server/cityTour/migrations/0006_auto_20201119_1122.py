# Generated by Django 3.1.1 on 2020-11-19 10:22

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cityTour", "0005_auto_20201108_1510"),
    ]

    operations = [
        migrations.AlterField(
            model_name="citytour",
            name="city",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="citytour",
            name="continent",
            field=models.CharField(blank=True, default="", max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="citytour",
            name="country",
            field=models.CharField(blank=True, default="", max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="citytour",
            name="date",
            field=models.DateField(default=datetime.date(2020, 11, 19)),
        ),
        migrations.AlterField(
            model_name="citytour",
            name="distance",
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]