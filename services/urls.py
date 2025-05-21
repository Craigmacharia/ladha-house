from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceListView, ServiceBookingViewSet, my_service_bookings

router = DefaultRouter()
router.register(r'service-bookings', ServiceBookingViewSet, basename='service-booking')

urlpatterns = [
    path('services/', ServiceListView.as_view(), name='service-list'),
    path('', include(router.urls)),
    path('my-service-bookings/', my_service_bookings, name='my-service-bookings'),
]




