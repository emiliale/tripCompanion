# Generated by Django 3.1.1 on 2020-11-29 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("place", "0006_auto_20201129_1624"),
    ]

    operations = [
        migrations.AddField(
            model_name="place",
            name="distance",
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name="place",
            name="duration",
            field=models.IntegerField(default=0),
        ),
    ]
