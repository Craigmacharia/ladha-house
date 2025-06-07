from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db.models import Q
from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError

from .models import Room, Booking
from .serializers import RoomSerializer, BookingSerializer
import logging

logger = logging.getLogger(__name__)


class RoomListView(generics.ListAPIView):
    """API endpoint that lists available rooms with optional filtering."""
    serializer_class = RoomSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Room.objects.all()

        if self.request.query_params.get('available', 'true').lower() == 'true':
            queryset = queryset.filter(is_available=True)

        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        logger.info(f"Returning {queryset.count()} rooms")
        return queryset.order_by('price')


class RoomDetailView(generics.RetrieveAPIView):
    """API endpoint to get room details."""
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [AllowAny]
    lookup_field = 'pk'


class BookingViewSet(viewsets.ModelViewSet):
    """API endpoint to manage bookings."""
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'delete']

    def get_queryset(self):
        return Booking.objects.filter(
            user=self.request.user,
            check_out__gte=timezone.now().date()
        ).order_by('check_in').select_related('room')

    def perform_create(self, serializer):
        room_id = serializer.validated_data.get('room_id')
        if not room_id:
            raise ValidationError({"room_id": "Room ID is required"})

        room = get_object_or_404(Room, id=room_id)

        if not room.is_available:
            raise ValidationError({"room_id": "Room is not available"})

        check_in = serializer.validated_data['check_in']
        check_out = serializer.validated_data['check_out']

        if check_in >= check_out:
            raise ValidationError({"dates": "Check-out must be after check-in"})

        if check_in < timezone.now().date():
            raise ValidationError({"dates": "Check-in cannot be in the past"})

        if Booking.objects.filter(
            room=room,
            check_out__gt=check_in,
            check_in__lt=check_out
        ).exists():
            raise ValidationError({"dates": "Room is already booked for those dates"})

        serializer.save(room=room)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        required_fields = ['room_id', 'check_in', 'check_out', 'full_name', 'email', 'phone']
        missing = [f for f in required_fields if f not in data]

        if missing:
            return Response(
                {"error": f"Missing fields: {', '.join(missing)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        for field in ['check_in', 'check_out']:
            if 'T' in data.get(field, ''):
                data[field] = data[field].split('T')[0]

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        logger.info(f"Booking created by {request.user.username}")
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=self.get_success_headers(serializer.data)
        )

    def destroy(self, request, *args, **kwargs):
        booking = self.get_object()
        if booking.check_in <= timezone.now().date():
            return Response(
                {"error": "Cannot cancel past bookings"},
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.delete()
        logger.info(f"Booking {kwargs['pk']} cancelled")
        return Response({"message": "Booking cancelled"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_bookings(request):
    """Returns all bookings for the current user, optionally filtered by status."""
    try:
        now = timezone.now().date()
        status_filter = request.query_params.get('status', 'upcoming')

        if status_filter == 'past':
            bookings = Booking.objects.filter(user=request.user, check_out__lt=now)
        else:  # upcoming (default)
            bookings = Booking.objects.filter(user=request.user, check_out__gte=now)

        bookings = bookings.order_by('-created_at')
        serializer = BookingSerializer(bookings, many=True, context={'request': request})

        return Response({
            "count": bookings.count(),
            "results": serializer.data
        })

    except Exception as e:
        logger.error(f"Bookings fetch failed: {str(e)}")
        return Response(
            {"error": "Failed to retrieve bookings"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )



from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt  # ⬅️ Add this line
def create_booking(request):
    ...


from rest_framework import viewsets
from .models import Room
from .serializers import RoomSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
