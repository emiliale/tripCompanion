from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Log(models.Model):
    created = models.DateTimeField(default=timezone.now)
    system = models.CharField(max_length=255)
    message = models.TextField()
    level = models.CharField(max_length=255)
    user = models.ForeignKey(
        User,
        related_name="generated_logs",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
    )

    def __str__(self):
        return "{} {}: {}".format(
            datetime_to_string(self.created), self.system, self.message[:20]
        )


def log(system, message, level="INFO", user=None):
    instance = Log.objects.create(
        system=system, message=message, level=level, user=user
    )
    return instance


def datetime_to_string(dt):
    return dt.strftime("%Y-%m-%d %H:%M:%S") if dt else None
