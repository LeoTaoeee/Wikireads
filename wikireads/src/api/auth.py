import flask
from flask import request, session, jsonify
import src
import src.model as model  # Correct import for model functions

# Do not create a new Flask app instance here; use the existing one initialized in `__init__.py`

def login_handler():
    try:
        # Get JSON data from the request
        username = request.json.get('username')
        password = request.json.get('password')

        # Check if username or password is missing
        if not username or not password:
            return jsonify({'qualified': False, 'message': 'Missing username or password'}), 400

        # Connect to the database and check the user
        db = model.get_db()
        user = db.execute(
            "SELECT * FROM Users WHERE uniqname = ? AND password = ?", (username, password)
        ).fetchone()

        if user is not None:
            session['username'] = username  # Set session variable
            return jsonify({'qualified': True, 'message': 'User logged in'}), 200
        else:
            return jsonify({'qualified': False, 'message': 'Invalid credentials'}), 401

    except Exception as e:
        # Log the exception for debugging (optional)
        print(f"Error during login: {e}")
        return jsonify({'qualified': False, 'message': 'Internal server error'}), 500
