import pytest
from django.utils import timezone
from pytest_factoryboy import register

from django_factory_boy.auth import UserFactory

register(UserFactory)


@pytest.fixture(name="user_build")
def fixture_user_build():
    return UserFactory.build(date_joined=timezone.now(), last_login=timezone.now())


@pytest.fixture(name="user_build_2")
def fixture_user_build_2():
    return UserFactory.build(date_joined=timezone.now(), last_login=timezone.now())


@pytest.fixture(name="user_build_3")
def fixture_user_build_3():
    return UserFactory.build(date_joined=timezone.now(), last_login=timezone.now())


@pytest.fixture(name="user_created")
def fixture_user_create(db):
    return UserFactory.create(date_joined=timezone.now(), last_login=timezone.now())


@pytest.fixture(name="user_created_2")
def fixture_user_create_2(db):
    return UserFactory.create(date_joined=timezone.now(), last_login=timezone.now())


@pytest.fixture(name="user_created_3")
def fixture_user_create_3(db):
    return UserFactory.create(username="username", password="password")
