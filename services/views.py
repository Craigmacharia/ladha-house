from rest_framework import generics, viewsets, permissions
from .models import Service, ServiceBooking
from .serializers import ServiceSerializer, ServiceBookingSerializer
from rest_framework.permissions import AllowAny

# List all available services
class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]

# Handle service bookings (POST, GET, DELETE for authenticated users)
class ServiceBookingViewSet(viewsets.ModelViewSet):
    queryset = ServiceBooking.objects.all()
    serializer_class = ServiceBookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Save the booking with the logged-in user
        serializer.save(user=self.request.user)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ServiceBooking
from .serializers import ServiceBookingSerializer
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_service_bookings(request):
    try:
        bookings = ServiceBooking.objects.filter(user=request.user).order_by('-created_at')
        serializer = ServiceBookingSerializer(bookings, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Failed to fetch service bookings: {str(e)}")
        return Response({"error": "Failed to retrieve service bookings"}, status=500)
