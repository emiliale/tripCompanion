import pytest
from pytest_factoryboy import register

from cityTour.tests.factories.cityTour_factories import CityTourFactory
from utils.test_base_classes.base_fixtures import *

register(CityTourFactory)


@pytest.fixture(name="cityTour_build")
def fixture_cityTour_build():
    return CityTourFactory.build()


@pytest.fixture(name="cityTour_created")
def fixture_cityTour_create(db):
    return CityTourFactory.create(name="CityTour name")


@pytest.fixture(name="cityTour_created_2")
def fixture_cityTour_create_2(db):
    return CityTourFactory.create()
