
from flask import jsonify
from .auth import login_handler


class ApiV1:
    """API Class."""

    def __init__(self, app):
        """Initializate class."""

        app.add_url_rule('/v1/login', 'login_handler',
                         login_handler, methods=['POST'])


    def get_base_url(self):
        """Return the base URL for API v1."""
        return "/api/v1/"


