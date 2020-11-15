import pytest
import json
from rest_framework import status

from cityTour.models import CityTour

from utils.test_base_classes.base_fixtures import *
from utils.test_base_classes.api_fixtures import *

from cityTour.tests.fixtures.models.cityTour_fixtures import *
from trip.tests.fixtures.models.trip_fixtures import *

URL = "/cityTour/cityTours/"


@pytest.fixture
def cityTour():
    return {"path": URL}


@pytest.mark.parametrize("fixture", ((pytest.lazy_fixture("cityTour")),))
def test_authorized_permitted_get_request(api_client_with_credentials, fixture):

    response = api_client_with_credentials.get(**fixture)
    assert response.status_code == status.HTTP_200_OK


def test_get_city_tour_by_id(db, api_client_with_credentials, cityTour_created):

    response = api_client_with_credentials.get(URL + "1/")
    assert response.data.get("id", None) == 1


def test_delete_city_tour_by_id(db, cityTour_created, api_client_with_credentials):

    assert CityTour.objects.count() == 1
    model_id = CityTour.objects.first().id

    response = api_client_with_credentials.delete(URL + f"{model_id}/")

    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert CityTour.objects.count() == 0


def test_update_city_tour_by_id(db, cityTour_created, api_client_with_credentials):

    assert CityTour.objects.count() == 1
    model_id = CityTour.objects.first().id

    data = {"name": "new_name"}

    response = api_client_with_credentials.patch(URL + f"{model_id}/", data=data)

    assert response.status_code == status.HTTP_200_OK
    assert CityTour.objects.get(id=model_id).name == "new_name"


def test_create_city_tour_invalid(db, api_client_with_credentials):

    assert CityTour.objects.count() == 0

    data = {}

    response = api_client_with_credentials.post(
        URL, data=json.dumps(data), content_type="application/json"
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_create_city_tour_valid(db, api_client_with_credentials, trip_created):

    assert CityTour.objects.count() == 0

    trip_created_id = trip_created.id

    data = {"name": "new_name", "trip": trip_created_id}

    response = api_client_with_credentials.post(
        URL, data=json.dumps(data), content_type="application/json"
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert CityTour.objects.first().name == "new_name"
