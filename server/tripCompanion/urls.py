from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('friendship/', include('friendship.urls')),
    path('place/', include('place.urls')),
    path('trip/', include('trip.urls')),
    path('cityTour/', include('cityTour.urls')),
    path('administration/', include('administration.urls')),
]
