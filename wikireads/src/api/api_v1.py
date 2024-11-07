from flask import jsonify
from .auth import login_handler


class ApiV1:
    """API Class."""

    def __init__(self, app):
        """Initializate class."""

        app.add_url_rule('/api/v1/login', 'login_hgandler',
                         login_handler, methods=['GET'])


    def get_base_url(self):
        """Return the base URL for API v1."""
        return "/api/v1/"


