import pytest
from django.utils import timezone
from rest_framework.authtoken.models import Token
from pytest_factoryboy import register
from django_factory_boy.auth import UserFactory


register(UserFactory)


URL = "http://testerver/"


@pytest.fixture(autouse=True)
def no_requests(monkeypatch):
    monkeypatch.delattr("requests.sessions.Session.request")


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient

    return APIClient()


@pytest.fixture
def api_client_with_credentials(db, api_client):
    token, _ = Token.objects.get_or_create(
        user=UserFactory.create(date_joined=timezone.now(), last_login=timezone.now())
    )
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    return api_client
