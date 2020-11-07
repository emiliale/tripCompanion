# Generated by Django 3.1.1 on 2020-11-07 11:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cityTour', '0003_auto_20201106_1838'),
    ]

    operations = [
        migrations.AddField(
            model_name='citytour',
            name='city',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='citytour',
            name='date',
            field=models.DateField(default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='citytour',
            name='distance',
            field=models.FloatField(default=0),
        ),
    ]
