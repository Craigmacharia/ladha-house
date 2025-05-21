from rest_framework import serializers
from .models import Service, ServiceBooking

# Serializer for displaying available services
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'price', 'duration_minutes']


# Serializer for handling service bookings
class ServiceBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceBooking
        fields = [
            'id', 'user', 'service', 'full_name', 'email',
            'phone', 'scheduled_date', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at']
