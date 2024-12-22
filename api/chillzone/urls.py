"""
URL configuration for chillzone project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from decouple import config

from chillzone.views import restauration_place, user

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/user/<int:user_id>/password', user.UserPasswordView.as_view(), name='api/user/id/password'),
    path('api/user/<int:user_id>', user.UserView.as_view(), name='api/user/id'),
    path('api/user/create', user.UserCreateView.as_view(), name='api/user/create'),
    path('api/user/login', user.UserLoginView.as_view(), name='api/user/login'),
    path('api/user/list',user.UsersView.as_view(), name='api/user/list'),

    path('api/restauration/place/<int:id_restaurant>/', restauration_place.RestaurationPlaceView.as_view(), name='api/restauration/place/id'),
    path('api/restauration/places', restauration_place.RestaurationPlacesView.as_view(), name='api/restauration/places')
]

if config('DEBUG') :
    urlpatterns = [
        path('__debug__/', include('debug_toolbar.urls')),
    ] + urlpatterns