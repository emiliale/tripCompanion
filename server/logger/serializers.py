from rest_framework import serializers
from logger.models import Log
from administration.serializers import UserSerializer
from django.contrib.auth.models import User
import pytz


class LogSerializer(serializers.ModelSerializer):

    created = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    logline = serializers.SerializerMethodField()

    def get_created(self, obj):
        return to_local_timezone_str(self.context["request"], obj.created)

    def get_user(self, obj):
        if obj.user:
            return UserSerializer(obj.user).data
        return {"username": "-"}

    def get_logline(self, obj):
        return "{} :: {} :: [{}] :: user @{}, {}".format(
            to_local_timezone_str(self.context["request"], obj.created),
            obj.level,
            obj.system,
            self.get_user(obj).get("username"),
            obj.message,
        )

    class Meta:
        model = Log
        fields = (
            "id",
            "created",
            "system",
            "message",
            "level",
            "user",
            "logline",
        )


def to_local_timezone_str(request, utc_dt, username=None):
    return (
        (to_local_timezone(request, utc_dt, username)).strftime("%Y-%m-%d %H:%M:%S")
        if utc_dt
        else None
    )


def to_local_timezone(request, utc_dt, username=None):
    user = request.user if request and hasattr(request, "user") else None
    if user is None:
        try:
            user = request["user"]
        except:
            user = None

    if username and user is None:
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            pass
    if user:
        timezone = pytz.timezone(user.timezone.timezone)
        return utc_dt.replace(tzinfo=pytz.utc).astimezone(timezone)

    return utc_dt
