from flask import Flask, render_template, request, url_for, redirect, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

with open("model_31-10-24.pkl", "rb") as file:
    model = pickle.load(file)

movies = pd.read_csv('data/ml-32m/movies.csv', dtype={'movieId': 'int64', 'title': 'str', 'genres': 'str'})

@app.route('/')
def homepage():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    if request.method == "POST":
        data = request.json

        wanted = data.get('wanted')
        unwanted = data.get('unwanted')
        # CHECK IF PART OF ACTUAL GENRES

        wanted_genres = wanted.split(',')
        unwanted_genres = unwanted.split(',')

        if wanted_genres and unwanted_genres:
            result = process_data(wanted_genres, unwanted_genres).tolist()
            return jsonify({'result': result})

    return jsonify({'error': 'Error occurred!'})

def process_data(wanted, unwanted):
    min_genre_match = 3

    print(wanted,unwanted)

    def genre_match(row, genres):
        movie_genres = set(row.split('|'))
        return len(movie_genres.intersection(genres)) >= (
            min_genre_match if len(genres) >= min_genre_match else len(genres))

    filtered_movies = movies[
        movies['genres'].apply(lambda x: genre_match(x, wanted)) &
        ~movies['genres'].str.contains('|'.join(unwanted))
        ]

    recommended_movies = []
    for movie_id in filtered_movies['movieId'].values:
        predicted_rating = model.predict(uid=0, iid=movie_id)
        recommended_movies.append((movie_id, predicted_rating.est))

    recommended_movies.sort(key=lambda x: x[1], reverse=True)

    top_recommendations = filtered_movies[
        filtered_movies['movieId'].isin([x[0] for x in recommended_movies[:10]])]

    print(top_recommendations)

    return top_recommendations.to_numpy()

if __name__ == '__main__':
    app.run()
