from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.core.paginator import Paginator

from rooms.models import Room
from dashboard.forms import RoomForm

from services.models import Service
from services.forms import ServiceForm


# Only allow admins to access dashboard
def admin_check(user):
    return user.is_superuser

@login_required
@user_passes_test(admin_check)
def dashboard_home(request):
    return render(request, 'dashboard/home.html')




@login_required
@user_passes_test(admin_check)
def manage_rooms(request):
    query = request.GET.get('q')  # "q" will be our search input name
    room_list = Room.objects.all()

    if query:
        room_list = room_list.filter(
            name__icontains=query
        ) | room_list.filter(
            description__icontains=query
        )

    paginator = Paginator(room_list, 5)  # 5 rooms per page
    page_number = request.GET.get('page')
    rooms = paginator.get_page(page_number)

    return render(request, 'dashboard/manage_rooms.html', {'rooms': rooms, 'query': query})


@login_required
@user_passes_test(admin_check)
def add_room(request):
    if request.method == 'POST':
        form = RoomForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Room added successfully!")  # Success message after adding
            return redirect('manage_rooms')
    else:
        form = RoomForm()

    return render(request, 'dashboard/add_room.html', {'form': form})

@login_required
@user_passes_test(admin_check)
def edit_room(request, room_id):
    room = Room.objects.get(id=room_id)

    if request.method == 'POST':
        form = RoomForm(request.POST, request.FILES, instance=room)
        if form.is_valid():
            form.save()
            messages.success(request, "Room updated successfully!")  # Success message after editing
            return redirect('manage_rooms')
    else:
        form = RoomForm(instance=room)

    return render(request, 'dashboard/edit_room.html', {'form': form})

@login_required
@user_passes_test(admin_check)
def delete_room(request, room_id):
    room = Room.objects.get(id=room_id)
    room.delete()
    messages.success(request, "Room deleted successfully!")  # Success message after deleting
    return redirect('manage_rooms')




def admin_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None and user.is_superuser:
            login(request, user)
            return redirect('dashboard_home')  # Adjust to your dashboard landing view name
        else:
            messages.error(request, "Invalid credentials or not an admin user.")
    
    return render(request, 'dashboard/admin_login.html')





@login_required
@user_passes_test(admin_check)
def manage_services(request):
    services = Service.objects.all()
    return render(request, 'dashboard/manage_services.html', {'services': services})

@login_required
@user_passes_test(admin_check)
def add_service(request):
    if request.method == 'POST':
        form = ServiceForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Service added successfully!')
            return redirect('manage_services')
    else:
        form = ServiceForm()
    return render(request, 'dashboard/add_service.html', {'form': form})

@login_required
@user_passes_test(admin_check)
def edit_service(request, service_id):
    service = Service.objects.get(id=service_id)
    if request.method == 'POST':
        form = ServiceForm(request.POST, instance=service)
        if form.is_valid():
            form.save()
            messages.success(request, 'Service updated successfully!')
            return redirect('manage_services')
    else:
        form = ServiceForm(instance=service)
    return render(request, 'dashboard/edit_service.html', {'form': form})

@login_required
@user_passes_test(admin_check)
def delete_service(request, service_id):
    service = Service.objects.get(id=service_id)
    service.delete()
    messages.success(request, 'Service deleted successfully!')
    return redirect('manage_services')


