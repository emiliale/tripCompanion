import pytest
from pytest_factoryboy import register

from django_factory_boy.auth import UserFactory
from utils.test_base_classes.base_fixtures import *

register(UserFactory)


@pytest.fixture(name="user_build")
def fixture_user_build():
    return UserFactory.build()


@pytest.fixture(name="user_created")
def fixture_user_create(db):
    return UserFactory.create(username="username", password="password")


@pytest.fixture(name="user_created_2")
def fixture_user_create_2(db):
    return UserFactory.create()
