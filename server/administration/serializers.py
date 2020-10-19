from django.contrib.auth.models import User, Permission
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    full_name = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_full_name(self, obj):
        first_name = obj.first_name if obj.first_name else ""
        last_name = obj.last_name if obj.last_name else ""
        full_name = "{} {}".format(first_name, last_name)
        return full_name if full_name != " " else obj.username

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "full_name",
            "password",
            "groups",
        )

    def create(self, validated_data):
        validated_data.popitem()  # removing created_by argument
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, instance, validated_data):
        user = super(UserSerializer, self).update(instance, validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user