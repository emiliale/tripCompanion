import pytest
import json
from rest_framework import status

from place.models import Place

from utils.test_base_classes.base_fixtures import *
from utils.test_base_classes.api_fixtures import *

from place.tests.fixtures.models.place_fixtures import *

URL = "/place/places/"


@pytest.fixture
def place():
    return {"path": URL}


@pytest.mark.parametrize("fixture", ((pytest.lazy_fixture("place")),))
def test_authorized_permitted_get_request(api_client_with_credentials, fixture):

    response = api_client_with_credentials.get(**fixture)
    assert response.status_code == status.HTTP_200_OK


def test_get_place_by_id(db, api_client_with_credentials, place_created):

    response = api_client_with_credentials.get(URL + "1/")
    assert response.data.get("id", None) == 1


def test_delete_place_by_id(db, place_created, api_client_with_credentials):

    assert Place.objects.count() == 1
    model_id = Place.objects.first().id

    response = api_client_with_credentials.delete(URL + f"{model_id}/")

    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert Place.objects.count() == 0


def test_update_place_by_id(db, place_created, api_client_with_credentials):

    assert Place.objects.count() == 1
    model_id = Place.objects.first().id

    data = {"name": "new_name"}

    response = api_client_with_credentials.patch(URL + f"{model_id}/", data=data)

    assert response.status_code == status.HTTP_200_OK
    assert Place.objects.get(id=model_id).name == "new_name"


def test_create_place_invalid(db, api_client_with_credentials):

    assert Place.objects.count() == 0

    data = {"name": "new_name"}

    response = api_client_with_credentials.post(
        URL, data=json.dumps(data), content_type="application/json"
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_create_place_valid(db, api_client_with_credentials):

    assert Place.objects.count() == 0

    data = {"name": "new_name", "xid": "xid"}

    response = api_client_with_credentials.post(
        URL, data=json.dumps(data), content_type="application/json"
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert Place.objects.first().name == "new_name"
