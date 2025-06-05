from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'bookings', views.BookingViewSet, basename='booking')

urlpatterns = [
    path('', include(router.urls)),
    path('rooms/', views.RoomListView.as_view(), name='room-list'),
    path('rooms/<int:pk>/', views.RoomDetailView.as_view(), name='room-detail'),
    path('my-bookings/', views.my_bookings, name='my-bookings'),# ❌ No need to wrap with api_view again
]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookingViewSet

router = DefaultRouter()
router.register(r'room-bookings', BookingViewSet, basename='room-bookings')

urlpatterns = [
    path('', include(router.urls)),
    # other paths like rooms/, etc.
]



