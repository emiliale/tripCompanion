import pytest
from pytest_factoryboy import register

from trip.tests.factories.trip_factories import TripFactory
from utils.test_base_classes.base_fixtures import *

register(TripFactory)


@pytest.fixture(name="trip_build")
def fixture_trip_build():
    return TripFactory.build()


@pytest.fixture(name="trip_created")
def fixture_trip_create(db):
    return TripFactory.create(name="Trip name")


@pytest.fixture(name="trip_created_2")
def fixture_trip_create_2(db):
    return TripFactory.create()
