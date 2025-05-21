from django.db import models
from django.contrib.auth.models import User

# ✅ Only one Service model with is_available
class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    duration_minutes = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)  # keep this if used in admin/logic

    def __str__(self):
        return self.name

# ✅ ServiceBooking with related_name to avoid reverse accessor conflict
class ServiceBooking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='service_bookings')
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    scheduled_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.service.name} booked by {self.full_name}"
