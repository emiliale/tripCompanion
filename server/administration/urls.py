from django.urls import path, include
from utils.api_utils import get_functionality_paths, get_router
from administration.api import App

urlpatterns = [
    path("", include(get_router(App, "administration").urls)),
    *get_functionality_paths(App, "administration"),
]
