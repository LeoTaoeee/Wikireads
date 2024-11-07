from flask import Flask
from flask_cors import CORS
from src.api.api_v1 import ApiV1

app = Flask(__name__)
CORS(app)  # This will allow all domains; you can customize it as needed.
api_v1 = ApiV1(app)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5555)