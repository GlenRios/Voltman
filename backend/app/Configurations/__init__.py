from pathlib import Path
import os
from datetime import timedelta

class ConfigApp:
    # Set secret key for session and JWT, with a fallback if not provided
    SECRET_KEY = os.getenv("SECRET_KEY", "hsgsy(add$5231524#bdsjfkelgro*ght*73@gwqt4qthd+pjk^df#")
    
    # JWT configuration
    JWT_SECRET_KEY = SECRET_KEY  # Secret key used for signing JWT tokens
    JWT_TOKEN_LOCATION = ['headers']  # JWT token is expected to be in headers
    JWT_COOKIE_SECURE = False  # Set to True in production when using HTTPS
    JWT_COOKIE_SAMESITE = 'None'  # Cross-site cookie sharing (None for cross-origin requests)
    JWT_COOKIE_CSRF_PROTECT = False  # CSRF protection (set True to enable)
    
    # Token expiration times
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)  # Access token expires in 1 hour
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)  # Refresh token expires in 7 days
    
# Define the base directory of the project
BASE_DIR = Path(__file__).parent.parent

