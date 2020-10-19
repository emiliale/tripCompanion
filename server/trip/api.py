from trip.models import Trip
from trip.serializers import TripSerializer
from utils.api_utils import setSerializer


class App:
    trips = setSerializer(Trip, TripSerializer)
