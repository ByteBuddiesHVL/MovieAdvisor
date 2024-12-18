from flask import Flask, render_template, request, url_for, redirect, jsonify
import requests
import pickle
import pandas as pd
from dotenv import load_dotenv
import os
import boto3

app = Flask(__name__)

load_dotenv()
OMDB_API_KEY = os.getenv("OMDB_API_KEY")

try :
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        region_name=os.getenv("AWS_REGION")
    )

    BUCKET_NAME = os.getenv("S3_BUCKET")

    model_file_key = 'model.pkl'
    movies_file_key = 'movies.csv'

    local_model_path = os.path.join('.','tmp','model.pkl')
    local_movies_path = os.path.join('.','tmp','movies.csv')

    os.makedirs(os.path.dirname(local_model_path), exist_ok=True)
    os.makedirs(os.path.dirname(local_movies_path), exist_ok=True)

    s3_client.download_file(BUCKET_NAME, model_file_key, local_model_path)
    s3_client.download_file(BUCKET_NAME, movies_file_key, local_movies_path)

    with open(local_model_path, 'rb') as f:
        model = pickle.load(f)
    movies = pd.read_csv(local_movies_path)

    print("Model and Movies loaded successfully.")

except Exception as e:
    print(f"Error loading model: {e}")

avail_genres = ["Action","Adventure","Animation","Children","Comedy","Crime","Documentary","Drama","Fantasy","Film-Noir","Horror","Musical","Mystery","Romance","Sci-Fi","Thriller","War","Western"]

@app.route('/')
def homepage():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    if request.method == "POST":
        data = request.json

        wanted = data.get('wanted')
        unwanted = data.get('unwanted')

        matches = all(any(s1 in s2 for s2 in avail_genres) for s1 in wanted) & all(any(s1 in s2 for s2 in avail_genres) for s1 in unwanted)
        if not matches:
            return jsonify({'error': 'Unknown genres'})

        if wanted is not None and unwanted is not None:
            result = process_data(wanted, unwanted).tolist()
            return jsonify({'result': result})

    return jsonify({'error': 'Error occurred!'})

def process_data(wanted, unwanted):
    min_genre_match = 3

    wanted_condition = True if len(wanted) == 0 else movies['genres'].apply(
        lambda x: len(set(x.split('|')).intersection(wanted)) >= min(len(wanted),min_genre_match))
    unwanted_condition = True if len(unwanted) == 0 else movies['genres'].apply(
        lambda x: not any(genre in x.split('|') for genre in unwanted))

    filtered_movies = movies[wanted_condition & unwanted_condition]

    recommended_movies = []
    for movie_id in filtered_movies['movieId'].values:
        predicted_rating = model.predict(uid=0, iid=movie_id)
        recommended_movies.append((movie_id, predicted_rating.est))

    recommended_movies.sort(key=lambda x: x[1], reverse=True)

    top_recommendations = filtered_movies[
        filtered_movies['movieId'].isin([x[0] for x in recommended_movies[:10]])]


    return top_recommendations.to_numpy()

@app.route('/omdb/<imdb_id>', methods=['GET'])
def get_omdb_api(imdb_id):
    # Make the request to OMDB using the server-side API key
    url = f'http://www.omdbapi.com/?apikey={OMDB_API_KEY}&i={imdb_id}'
    omdb_response = requests.get(url)
    return jsonify(omdb_response.json())

if __name__ == '__main__':
    app.run()