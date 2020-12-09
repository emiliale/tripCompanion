from cityTour.models import CityTour, CityTourTemplate
from trip.models import Trip
from place.models import Place
from cityTour.serializers import CityTourSerializer, CityTourTemplateSerializer
from utils.api_utils import setSerializer
from django.contrib.auth.models import User


class App:
    cityTours = setSerializer(CityTour, CityTourSerializer)
    cityToursTemplates = setSerializer(CityTourTemplate, CityTourTemplateSerializer)

    def create_cityTour_from_template(
        self, name, date, trip, users, template, request=None, serialized=False
    ):
        if all([trip, date, users, template]):

            users_list = User.objects.filter(id__in=users)
            places_list = Place.objects.filter(id__in=template["places"])

            try:
                cityTour_instance = CityTour.objects.create(
                    name=name,
                    city=template["city"],
                    distance=template["distance"],
                    date=date,
                    country=template["country"],
                    continent=template["continent"],
                    trip=Trip.objects.get(id=trip),
                )
                cityTour_instance.users.set(users_list)
                cityTour_instance.places.set(places_list)

                return CityTourSerializer(cityTour_instance).data
            except Exception as e:
                raise Exception("Exception occurred: {}".format(e))
        raise ValueError
