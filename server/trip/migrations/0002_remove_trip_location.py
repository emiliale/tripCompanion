# Generated by Django 3.1.1 on 2020-11-07 12:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("trip", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="trip",
            name="location",
        ),
    ]
