import flask
from flask import session, jsonify
import src.model as model  # Correct import for model functions

def user_reads_handler():
    try:
        # Check if the user is logged in
        if 'username' not in session:
            return jsonify({'error': 'User not logged in'}), 401

        username = session['username']

        # Connect to the database
        db = model.get_db()

        # Query for articles currently being read (percent_completion < 100)
        current_reads = db.execute(
            """
            SELECT 
                Articles.article_name, 
                Articles.article_filename, 
                Articles.avg_rating, 
                Articles.genre
            FROM Reads
            JOIN Articles ON Reads.article_id = Articles.article_id
            WHERE Reads.uniqname = ? AND Reads.percent_completion < 100
            """,
            (username,)
        ).fetchall()

        # Query for articles finished reading (percent_completion = 100)
        past_reads = db.execute(
            """
            SELECT 
                Articles.article_name, 
                Articles.article_filename, 
                Articles.avg_rating, 
                Articles.genre
            FROM Reads
            JOIN Articles ON Reads.article_id = Articles.article_id
            WHERE Reads.uniqname = ? AND Reads.percent_completion = 100
            """,
            (username,)
        ).fetchall()

        # Convert query results to dictionaries
        current_reads_list = [
            {
                'article_name': row['article_name'],
                'article_filename': row['article_filename'],
                'avg_rating': row['avg_rating'],
                'genre': row['genre']
            }
            for row in current_reads
        ]

        past_reads_list = [
            {
                'article_name': row['article_name'],
                'article_filename': row['article_filename'],
                'avg_rating': row['avg_rating'],
                'genre': row['genre']
            }
            for row in past_reads
        ]

        # Return the data as a JSON response
        return jsonify({
            'currentreads': current_reads_list,
            'pastreads': past_reads_list
        }), 200

    except Exception as e:
        # Log the exception for debugging (optional)
        print(f"Error during fetching user reads: {e}")
        return jsonify({'error': 'Internal server error'}), 500
