from src import app  # Import the `app` instance from `src/__init__.py`

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5555)