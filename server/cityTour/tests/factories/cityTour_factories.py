import factory

from cityTour.models import CityTour
from utils.test_base_classes.base_factories import BaseFactory
from trip.tests.factories.trip_factories import TripFactory


class CityTourFactory(BaseFactory):
    class Meta:
        model = CityTour

    name = factory.Sequence(lambda n: "cityTour_{0}".format(n))
    trip = factory.SubFactory(TripFactory)
