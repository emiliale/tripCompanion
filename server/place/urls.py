from django.urls import path, include
from utils.api_utils import get_functionality_paths, get_router
from place.api import App

urlpatterns = [
    path("", include(get_router(App, "place").urls)),
    *get_functionality_paths(App, "place")
]
