from django import forms
from rooms.models import Room
from .models import Service  # Assuming services app is in the same directory


class RoomForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ['name', 'description', 'price', 'is_available', 'image']
        
        # Optional: Add widgets or labels for better UX
        widgets = {
            'description': forms.Textarea(attrs={
                'rows': 4,
                'class': 'form-control',
                'placeholder': 'Enter room description...'
            }),
            'image': forms.FileInput(attrs={
                'class': 'form-control'
            })
        }
        labels = {
            'is_available': 'Availability Status'
        }


class ServiceForm(forms.ModelForm):
    class Meta:
        model = Service
        fields = ['name', 'description', 'price', 'duration_minutes']
        widgets = {
            'description': forms.Textarea(attrs={
                'rows': 4,
                'class': 'form-control',
                'placeholder': 'Enter service details...'
            }),
            'duration_minutes': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': 1
            })
        }
        labels = {
            'duration_minutes': 'Duration (minutes)'
        }

    # Optional: Add validation (example)
    def clean_price(self):
        price = self.cleaned_data.get('price')
        if price <= 0:
            raise forms.ValidationError("Price must be greater than zero.")
        return price
