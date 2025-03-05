"""
URL configuration for chillzone project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from chillzone.views import (
    admin_boards, home, notification, reservation, user, faq, network,
    owner_boards, super_admin_boards, calendar, restaurant, command, map
)
from drf_spectacular.views import (
    SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
)

from rest_framework_simplejwt.views import (
    TokenVerifyView,
    TokenRefreshView,
)

# ============================ URLS PRINCIPALES ============================= #

urlpatterns = [
    path('admin/', admin.site.urls),
    path('verify', TokenVerifyView.as_view(), name='Verify token'),
    path('refresh/', TokenRefreshView.as_view(), name='Refresh token'),

    # ============================ AUTHENTIFICATION ============================= #
    path('login/', user.LoginView.as_view(), name='Sign In'),
    path('logout/', user.LogoutView.as_view(), name='Sign Out'),
    path('forget-password/', user.PasswordForgetView.as_view(), name='Start reset password process'),
    path('reset-password/<uuid:uuid>', user.PasswordResetView.as_view(), name='Reset password process'),
    path('change-password/', user.ChangePasswordView.as_view(), name='Update password'),
    path('change-information-profil/', user.UserInfoUpdateView.as_view(), name='Update user info'),

    # ============================ APPLICATION ============================= #
    path('home/', home.UserDashboardView.as_view(), name='User Dashboard'),
    path('notification/', notification.NotificationView.as_view(), name='Client Notification'),
    path('calendar/', calendar.CalendarView.as_view(), name='Client Calendar'),
    path('reservation/', reservation.ReservationView.as_view(), name='Client Reservation'),
    path('conflict/', reservation.ClientConflictView.as_view(), name='Client create Conflict'),
    path('mapfloor/', map.MapView.as_view(), name='Client Map'),
    path('my-reservation/', reservation.ClientReservationView.as_view(), name='Client Reservations'),
    path('my-commands/', command.UserCommandView.as_view(), name='Client Commands'),
    path('faq/', faq.FAQView.as_view(), name='Client FAQ'),
    path('network/', network.NetworkView.as_view(), name='Client Network'),
    path('restaurants/', restaurant.ClientRestaurantView.as_view(), name='Client Restaurant List'),
    path('restaurant/<int:id>/', restaurant.RestaurantView.as_view(), name='Client Restaurant'),

    # ============================ GESTION DES UTILISATEURS ============================= #
    path('create-owner-account/', user.OwnerCreateView.as_view(), name='Create Owner Account'),

    # ============================ SUPER ADMIN ============================= #
    path('superadmin-requests/', super_admin_boards.SuperAdminRequestsView.as_view(), name='Super Admin Requests'),
    path('superadmin-users/', super_admin_boards.SuperAdminUsersView.as_view(), name='Super Admin Users'),

    # ============================ ADMIN ============================= #
    path('admin-dashboard/', admin_boards.AdminDashboardView.as_view(), name='Admin Dashboard'),
    path('admin-accounts/', admin_boards.AdminUserView.as_view(), name='Admin User Management'),
    path('admin-rooms/', admin_boards.AdminLocationView.as_view(), name='Admin Room Management'),
    path('admin-booking/', admin_boards.AdminReservationConflictView.as_view(), name='Admin Reservations'),
    path('admin-mapfloor/', admin_boards.AdminMapView.as_view(), name='Admin Map Management'),
    path('admin-information/', admin_boards.AdminInfoView.as_view(), name='Admin Info Management'),
    path('admin-restaurants/', admin_boards.AdminRestaurantView.as_view(), name='Admin Restaurant Management'),
    path('admin-faq/', faq.AdminFAQView.as_view(), name='Admin FAQ Management'),
    path('admin-network/', network.AdminNetworkView.as_view(), name='Admin Network Management'),

    # ============================ OWNER ============================= #
    path('owner-dashboard/', owner_boards.OwnerDashboardView.as_view(), name='Owner Dashboard'),
    path('owner-menus/', owner_boards.OwnerMenuView.as_view(), name='Owner Menu Management'),
    path('owner-meals/', owner_boards.OwnerMealView.as_view(), name='Owner Meal Management'),
    path('owner-commands/', owner_boards.OwnerCommandsView.as_view(), name='Owner Commands'),

    # ============================ API DOC ============================= #
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

# ============================ MEDIA SERVING ============================= #
# Permet d'accéder aux fichiers médias en production via Django si aucune solution Nginx/Apache n'est utilisée.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    from django.views.static import serve
    from django.urls import re_path

    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    ]

# ============================ DEBUG TOOLBAR ============================= #
if settings.DEBUG:
    urlpatterns += [path('__debug__/', include('debug_toolbar.urls'))]
