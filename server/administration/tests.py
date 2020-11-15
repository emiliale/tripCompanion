from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from django.test import Client


class LogInTest(TestCase):
    def setUp(self):
        self.credentials = {"username": "testuser", "password": "secret"}
        User.objects.create_user(**self.credentials)

    def test_login(self):
        # send login data
        response = self.client.post("/rest-auth/login/", self.credentials, follow=True)

        self.assertTrue(response.status_code, status.HTTP_200_OK)


class ChangePasswordTest(TestCase):
    def setUp(self):
        self.credentials = {"username": "testuser", "password": "secret"}
        User.objects.create_user(**self.credentials)

    def test_change_password(self):
        self.client.post("/rest-auth/login/", self.credentials, follow=True)
        response = self.client.post(
            "/rest-auth/password/change/",
            {
                "new_password1": "newpassword",
                "new_password2": "newpassword",
                "old_password": "secret",
            },
            follow=True,
        )
        self.user = User.objects.get(
            username="testuser"
        )  # get user again so that you can see updated password
        self.assertEquals(self.user.check_password("newpassword"), True)
