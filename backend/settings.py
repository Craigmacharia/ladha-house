from pathlib import Path
import os
import django
import dj_database_url
from django.contrib.auth import get_user_model

# BASE DIRECTORY
BASE_DIR = Path(__file__).resolve().parent.parent
REACT_APP_BUILD_DIR = os.path.join(BASE_DIR, 'ladhahouse-frontend', 'dist')

# SECURITY
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'fallback-key-for-dev')
DEBUG = True  # Change to False in production
ALLOWED_HOSTS = ['.onrender.com', 'localhost', '127.0.0.1']

# CORS / CSRF for Netlify frontend
CORS_ALLOW_ALL_ORIGINS = False  # Important: set False for security
CORS_ALLOWED_ORIGINS = [
    "https://ladhahouse.netlify.app",
]
CSRF_TRUSTED_ORIGINS = [
    "https://ladhahouse.netlify.app",
]

# APPLICATIONS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework.authtoken',
    'corsheaders',
    'rooms',
    'dashboard',
    'services',
    'widget_tweaks',
]

# MIDDLEWARE
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Must be right after SecurityMiddleware
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URLS & WSGI
ROOT_URLCONF = 'backend.urls'
WSGI_APPLICATION = 'backend.wsgi.application'

# TEMPLATES
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [REACT_APP_BUILD_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# DATABASE
DATABASES = {
    'default': dj_database_url.config(
        default='postgres://postgres:admin123@localhost:5432/ladhahouse',
        conn_max_age=600
    )
}

# PASSWORD VALIDATION
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# REST FRAMEWORK CONFIG
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

# STATIC FILES
STATIC_URL = '/static/'
STATICFILES_DIRS = [REACT_APP_BUILD_DIR]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # for collectstatic

# AUTHENTIFICATION
LOGIN_URL = '/dashboard/login/'
LOGIN_REDIRECT_URL = '/dashboard/'

# INTERNATIONALIZATION
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# AUTO SUPERUSER FOR RENDER DEPLOYMENTS
if os.getenv("RENDER", "") == "true":
    django.setup()
    User = get_user_model()
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="admin123"
        )



# Only for development or trusted API calls
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
