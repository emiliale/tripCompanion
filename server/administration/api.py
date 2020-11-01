from django.contrib.auth.models import User
from administration.serializers import UserSerializer
from utils.api_utils import setSerializer


class App:
    users = setSerializer(User, UserSerializer)
