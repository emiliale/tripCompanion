from cityTour.models import CityTour
from cityTour.serializers import CityTourSerializer
from utils.api_utils import setSerializer


class App:
    cityTours = setSerializer(CityTour, CityTourSerializer)
