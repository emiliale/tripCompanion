import pytest
import json
from rest_framework import status

from trip.models import Trip

from utils.test_base_classes.base_fixtures import *
from utils.test_base_classes.api_fixtures import *

from trip.tests.fixtures.models.trip_fixtures import *
from datetime import datetime

URL = "/trip/trips/"


@pytest.fixture
def trip():
    return {"path": URL}


@pytest.mark.parametrize("fixture", ((pytest.lazy_fixture("trip")),))
def test_authorized_permitted_get_request(api_client_with_credentials, fixture):

    response = api_client_with_credentials.get(**fixture)
    assert response.status_code == status.HTTP_200_OK


def test_get_trip_by_id(db, api_client_with_credentials, trip_created):

    response = api_client_with_credentials.get(URL + "1/")
    assert response.data.get("id", None) == 1


def test_delete_trip_by_id(db, trip_created, api_client_with_credentials):

    assert Trip.objects.count() == 1
    model_id = Trip.objects.first().id

    response = api_client_with_credentials.delete(URL + f"{model_id}/")

    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert Trip.objects.count() == 0


def test_update_trip_by_id(db, trip_created, api_client_with_credentials):

    assert Trip.objects.count() == 1
    model_id = Trip.objects.first().id

    data = {"name": "new_name"}

    response = api_client_with_credentials.patch(URL + f"{model_id}/", data=data)

    assert response.status_code == status.HTTP_200_OK
    assert Trip.objects.get(id=model_id).name == "new_name"


def test_create_trip_invalid(db, api_client_with_credentials):

    assert Trip.objects.count() == 0

    data = {"name": "new_name"}

    response = api_client_with_credentials.post(
        URL, data=json.dumps(data), content_type="application/json"
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_create_trip_invalid_type(db, api_client_with_credentials):

    assert Trip.objects.count() == 0

    data = {"name": "new_name", "start_date": "11", "end_date": "data"}

    response = api_client_with_credentials.post(
        URL, data=json.dumps(data), content_type="application/json"
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_create_trip_valid(db, api_client_with_credentials):

    assert Trip.objects.count() == 0

    data = {"name": "new_name", "start_date": "2011-02-11", "end_date": "2011-02-15"}

    response = api_client_with_credentials.post(
        URL, data=json.dumps(data), content_type="application/json"
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert Trip.objects.first().name == "new_name"
