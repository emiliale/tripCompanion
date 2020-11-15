import factory

from trip.models import Trip
from utils.test_base_classes.base_factories import BaseFactory
from datetime import datetime


class TripFactory(BaseFactory):
    class Meta:
        model = Trip

    name = factory.Sequence(lambda n: "place_{0}".format(n))
    start_date = factory.LazyFunction(datetime.now)
    end_date = factory.LazyFunction(datetime.now)
