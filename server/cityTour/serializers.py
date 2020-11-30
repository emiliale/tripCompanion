from rest_framework import serializers
from cityTour.models import CityTour, CityTourTemplate


class CityTourSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityTour
        fields = "__all__"


class CityTourTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityTourTemplate
        fields = "__all__"
