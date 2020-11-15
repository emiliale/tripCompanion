import pytest
import json
from rest_framework import status

from django.contrib.auth.models import User

from utils.test_base_classes.base_fixtures import *
from utils.test_base_classes.api_fixtures import *

URL = "/administration/users/"


@pytest.fixture
def user():
    return {"path": URL}


@pytest.mark.parametrize("fixture", ((pytest.lazy_fixture("user")),))
def test_authorized_permitted_get_request(api_client_with_credentials, fixture):
    response = api_client_with_credentials.get(**fixture)
    assert response.status_code == status.HTTP_200_OK


def test_get_user_by_id(db, api_client_with_credentials, user_created):
    response = api_client_with_credentials.get(URL + "1/")
    assert response.data.get("id", None) == 1


def test_delete_user_by_id(db, user_created, api_client_with_credentials):
    assert User.objects.count() == 2
    model_id = User.objects.first().id

    response = api_client_with_credentials.delete(URL + f"{model_id}/")

    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert User.objects.count() == 1


def test_update_user_by_id(db, user_created, api_client_with_credentials):
    assert User.objects.count() == 2
    model_id = User.objects.first().id

    data = {"username": "new_name", "password": "password"}

    response = api_client_with_credentials.patch(URL + f"{model_id}/", data=data)

    assert response.status_code == status.HTTP_200_OK
    assert User.objects.get(id=model_id).username == "new_name"


def test_create_user_invalid(db, api_client_with_credentials):
    assert User.objects.count() == 1

    data = {}

    response = api_client_with_credentials.post(
        URL, data=json.dumps(data), content_type="application/json"
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_create_user_valid(db, api_client_with_credentials):
    assert User.objects.count() == 1

    data = {
        "username": "new_name",
        "password": "password",
        "created_by": User.objects.first().id,
    }

    response = api_client_with_credentials.post(
        URL, data=json.dumps(data), content_type="application/json"
    )

    assert response.status_code == status.HTTP_201_CREATED
    content_type, created = User.objects.get_or_create(username="new_name")
    assert not created
