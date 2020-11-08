from rest_framework import serializers
from cityTour.models import CityTour


class CityTourSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityTour
        fields = "__all__"
