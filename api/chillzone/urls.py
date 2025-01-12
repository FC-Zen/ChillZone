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

from chillzone.views import admin_boards, home, notification, reservation, user, faq, network
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # ====================== GENERIC ======================= #
    path('login/', user.UserLogin.as_view(), name='Sign In and Sign Out'),
    path('forget-password/', user.PasswordForgetView.as_view(), name='Start reset password processus'),
    path('reset-password/<uuid:uuid>', user.PasswordResetView.as_view(), name='Reset password processus'),
    path('change-password/', user.ChangePasswordView.as_view(), name='Update paswword'),
    path('change-information-profil/', user.UserInfoUpdateView.as_view(), name='Update user info'),

    # ======================== APP ========================= #
    path('home/', home.UserDashboardView.as_view(), name='Sign In and Sign Out'),
    path('notification/', notification.NotificationView.as_view(), name='Client List Notification'),
    path('reservation/', reservation.ClientReservationView.as_view(), name='Client List / Cancel Reservation'),
    path('faq/', faq.FAQView.as_view(), name='Client FAQ'),
    path('network/', network.NetworkView.as_view(), name='Client List Network'),

    # ======================== WEB ========================= #

    # -------------------- Super Admin --------------------- #

    # ----------------------- Admin ------------------------ #
    path('admin-dashboard/', admin_boards.AdminDashboardView.as_view(), name='Admin Dashboard'),
    path('admin-accounts/', admin_boards.AdminUserView.as_view(), name='Admin List / Create / Update User'),
    path('admin-rooms/', admin_boards.AdminLocationView.as_view(), name='Admin List / Create / Update Location'),
    path('admin-booking/', admin_boards.AdminReservationConflictView.as_view(), name='Admin List Reservation / Conflict'),
    path('admin-map/', admin_boards.AdminMapView.as_view(), name='Admin List / Create / Update / Delete Map'),
    path('admin-restaurants/', admin_boards.AdminRestaurantView.as_view(), name='Admin List / Create / Update / Delete Restaurant'),
    path('admin-faq/', faq.AdminFAQView.as_view(), name='Admin List / Create / Update / Delete FAQ'),
    path('admin-network/', network.AdminNetworkView.as_view(), name='Admin List / Create / Update / Delete Network'),

    # ----------------------- Owner ------------------------ #


    # Endpoint pour le schéma OpenAPI JSON
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Documentation Swagger UI
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    # Documentation Redoc UI
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

if config('DEBUG') :
    urlpatterns = [
        path('__debug__/', include('debug_toolbar.urls')),
    ] + urlpatterns