from place.models import Place
from place.serializers import PlaceSerializer
from utils.api_utils import setSerializer


class App:
    places = setSerializer(Place, PlaceSerializer)
