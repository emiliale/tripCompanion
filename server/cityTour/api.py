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
        if trip and date and users and template:
            users_list = []
            places_list = []

            for user in users:
                users_list.append(User.objects.get(id=user))

            for place in template["places"]:
                places_list.append(Place.objects.get(id=place))

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
            except:
                raise Exception("Wrong data")
        raise RuntimeError
