# Generated by Django 3.1.1 on 2020-11-06 17:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('place', '0002_auto_20201028_1133'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='place',
            name='order',
        ),
    ]
