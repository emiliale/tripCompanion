import factory
from pytest_factoryboy import register
from django_factory_boy.auth import UserFactory

from place.models import Place
from utils.test_base_classes.base_factories import BaseFactory


register(UserFactory)


class PlaceFactory(BaseFactory):
    class Meta:
        model = Place

    name = factory.Sequence(lambda n: "place_{0}".format(n))
    xid = "random xid"
