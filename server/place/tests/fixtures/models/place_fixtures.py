import pytest
from pytest_factoryboy import register

from place.tests.factories.place_factories import PlaceFactory
from utils.test_base_classes.base_fixtures import *

register(PlaceFactory)


@pytest.fixture(name="place_build")
def fixture_place_build():
    return PlaceFactory.build()


@pytest.fixture(name="place_created")
def fixture_place_create(db):
    return PlaceFactory.create(name="Place name")


@pytest.fixture(name="place_created_2")
def fixture_place_create_2(db):
    return PlaceFactory.create()
