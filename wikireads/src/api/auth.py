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

@app.route('/api/v1/login', methods=['POST'])
def login_handler():
    username = flask.request.json.get('username')
    password = flask.request.json.get('password')
    
    db = model.get_db()
    user = db.execute(
        "SELECT * FROM Users WHERE uniqname = ? AND password = ?", (username, password)
    ).fetchone()
    
    if user is not None:
        flask.session['username'] = username  # Set session variable
        return flask.jsonify({'qualified': True, 'message': 'User logged in'}), 200
    else:
        return flask.jsonify({'qualified': False, 'message': 'Invalid credentials'}), 401