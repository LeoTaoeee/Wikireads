"""WikiReads development configuration."""

import pathlib

# Root of the application
APPLICATION_ROOT = '/'

# Secret key for encrypting cookies (replace with a secure random key)
SECRET_KEY = b'your_secret_key_here'
SESSION_COOKIE_NAME = 'login'

# File Upload to var/uploads/
WIKIREADS_ROOT = pathlib.Path(__file__).resolve().parent.parent
UPLOAD_FOLDER = WIKIREADS_ROOT / 'var' / 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB limit

# Database file location
DATABASE_FILENAME = WIKIREADS_ROOT / 'src' / 'var' / 'wikireads.sqlite3'
