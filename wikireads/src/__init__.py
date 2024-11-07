"""WikiReads package initializer."""
import flask
import src.config as config

# Create the Flask app
app = flask.Flask(__name__)

# Load the configuration from config.py
app.config.from_object(config)

# Optionally load additional settings from environment variables if needed
app.config.from_envvar('WIKIREADS_SETTINGS', silent=True)

# Import the views and models to register routes and database access
import src.model  # noqa: E402  pylint: disable=wrong-import-position
import src.api.api_v1  # noqa: E402  pylint: disable=wrong-import-position
import src.api.auth  # noqa: E402  pylint: disable=wrong-import-position

# Register blueprints or routes if needed (e.g., for modularity)
# If your API uses Flask Blueprints, make sure to register them here
# app.register_blueprint(src.api.api_v1.bp)
api_v1 = src.api.api_v1(app)