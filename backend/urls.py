from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import redirect
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dashboard/', include('dashboard.urls')),
    path('', lambda request: redirect('admin_login')),  # 👈 Works now

    # APIs
    path('api/', include('rooms.urls')),
    path('api/auth/', include('auth.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('services.urls')),  # NOT services.service-urls or anything else


    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

