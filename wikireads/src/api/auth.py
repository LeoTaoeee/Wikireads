from functools import wraps
import hashlib
import hmac
import uuid
import flask
from flask import request, abort, session
import src
import src.model as model


app = flask.Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for session handling


def login_handler():
    try:
        # Get JSON data from the request
        username = flask.request.json.get('username')
        password = flask.request.json.get('password')

        # Check if username or password is missing
        if not username or not password:
            return flask.jsonify({'qualified': False, 'message': 'Missing username or password'}), 400

        # Connect to the database and check the user
        db = model.get_db()
        user = db.execute(
            "SELECT * FROM Users WHERE uniqname = ? AND password = ?", (username, password)
        ).fetchone()

        if user is not None:
            flask.session['username'] = username  # Set session variable
            return flask.jsonify({'qualified': True, 'message': 'User logged in'}), 200
        else:
            return flask.jsonify({'qualified': False, 'message': 'Invalid credentials'}), 401

    except Exception as e:
        # Log the exception for debugging (optional)
        print(f"Error during login: {e}")
        return flask.jsonify({'qualified': False, 'message': 'Internal server error'}), 500
