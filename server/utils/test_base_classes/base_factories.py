import factory
from factory import fuzzy


class BaseFactory(factory.django.DjangoModelFactory):
    class Meta:
        strategy = factory.BUILD_STRATEGY  # CREATE_STRATEGY
