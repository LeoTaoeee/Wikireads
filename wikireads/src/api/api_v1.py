
from flask import jsonify
from .auth import login_handler
from .frontpage import user_reads_handler


class ApiV1:
    """API Class."""

    def __init__(self, app):
        """Initializate class."""

        app.add_url_rule('/v1/login', 'login_handler',
                         login_handler, methods=['POST'])
        app.add_url_rule('/v1/userreads', 'user_reads_handler',
                         user_reads_handler, methods = ['GET'])


    def get_base_url(self):
        """Return the base URL for API v1."""
        return "/api/v1/"


