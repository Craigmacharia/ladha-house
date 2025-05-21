from rest_framework import serializers
from rest_framework.request import Request as DRFRequest
from django.http import HttpRequest
from django.contrib.auth.models import User
from django.utils import timezone
from .models import Room, Booking
import logging

logger = logging.getLogger(__name__)


class RoomSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2, coerce_to_string=False)

    class Meta:
        model = Room
        fields = ['id', 'name', 'description', 'price', 'is_available', 'image', 'capacity']
        read_only_fields = ['is_available']

    def get_image(self, obj):
        request = self.context.get('request')

        # If request is a standard Django request
        if isinstance(request, HttpRequest) and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)

        # If request is a DRF Request (wraps HttpRequest inside ._request)
        if isinstance(request, DRFRequest) and hasattr(obj.image, 'url'):
            return request._request.build_absolute_uri(obj.image.url)

        # Fallback if image exists but no request context
        if hasattr(obj.image, 'url'):
            return obj.image.url

        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['price'] = float(instance.price)
        return representation


class BookingSerializer(serializers.ModelSerializer):
    room = RoomSerializer(read_only=True)
    room_id = serializers.IntegerField(write_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = [
            'id', 'room', 'room_id', 'total_price',
            'full_name', 'email', 'phone',
            'check_in', 'check_out', 'created_at'
        ]
        read_only_fields = ['id', 'created_at', 'room', 'total_price']

    def validate(self, data):
        check_in = data.get('check_in')
        check_out = data.get('check_out')
        today = timezone.now().date()
        room_id = data.get('room_id')

        if not check_in or not check_out:
            raise serializers.ValidationError({
                "dates": "Both check-in and check-out dates are required."
            })

        if check_in < today:
            raise serializers.ValidationError({
                "check_in": "Check-in date cannot be in the past."
            })

        if check_out <= check_in:
            raise serializers.ValidationError({
                "check_out": "Check-out must be after check-in."
            })

        if not room_id:
            raise serializers.ValidationError({
                "room_id": "Room ID is required."
            })

        try:
            room = Room.objects.get(id=room_id)
        except Room.DoesNotExist:
            raise serializers.ValidationError({
                "room_id": f"Room with id {room_id} does not exist."
            })

        if not room.is_available:
            raise serializers.ValidationError({
                "room_id": "This room is not available for booking."
            })

        overlapping = Booking.objects.filter(
            room=room,
            check_out__gt=check_in,
            check_in__lt=check_out
        ).exists()

        if overlapping:
            raise serializers.ValidationError({
                "dates": "Room is already booked for those dates."
            })

        data['room'] = room
        return data

    def create(self, validated_data):
        validated_data.pop('room_id', None)
        user = self.context['request'].user

        try:
            booking = Booking.objects.create(
                user=user,
                **validated_data
            )
            return booking
        except Exception as e:
            logger.error(f"Failed to create booking: {str(e)}")
            raise serializers.ValidationError({
                "error": "Failed to create booking. Please try again."
            })

    def get_total_price(self, obj):
        if obj.room and obj.check_in and obj.check_out:
            nights = (obj.check_out - obj.check_in).days
            return float(obj.room.price) * nights
        return None
