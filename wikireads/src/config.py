"""WikiReads development configuration."""

import pathlib

# Root of the application
APPLICATION_ROOT = '/'

# Secret key for encrypting cookies (replace with a secure random key)
SECRET_KEY = b'\xa6M\x9d9\x86\xd4\xa4g)\x05\xaeI&\
                x1b-\x19\x04T\xd8\xe4\xac|\x05x'
SESSION_COOKIE_NAME = 'login'

# File Upload to var/uploads/
WIKIREADS_ROOT = pathlib.Path(__file__).resolve().parent.parent
UPLOAD_FOLDER = WIKIREADS_ROOT / 'var' / 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB limit

# Database file location
DATABASE_FILENAME = WIKIREADS_ROOT / 'src' / 'var' / 'wikireads.sqlite3'
