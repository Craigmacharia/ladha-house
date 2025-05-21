from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_home, name='dashboard_home'),
    path('rooms/', views.manage_rooms, name='manage_rooms'),
    path('rooms/add/', views.add_room, name='add_room'),# <-- New URL
    path('rooms/edit/<int:room_id>/', views.edit_room, name='edit_room'),
    path('rooms/delete/<int:room_id>/', views.delete_room, name='delete_room'),
    path('login/', views.admin_login, name='admin_login'),
    path('services/', views.manage_services, name='manage_services'),

]


from .views import manage_services, add_service, edit_service, delete_service

urlpatterns += [
    path('services/', manage_services, name='manage_services'),
    path('services/add/', add_service, name='add_service'),
    path('services/edit/<int:service_id>/', edit_service, name='edit_service'),
    path('services/delete/<int:service_id>/', delete_service, name='delete_service'),
]

