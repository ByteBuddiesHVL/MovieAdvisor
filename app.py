from flask import Flask, render_template, request, url_for
import pickle
import pandas as pd
from torch.distributed.elastic.multiprocessing.redirects import redirect

app = Flask(__name__)

with open("model_31-10-24.pkl", "rb") as file:
    model = pickle.load(file)

movies = pd.read_csv('data/ml-32m/movies.csv', dtype={'movieId': 'int64', 'title': 'str', 'genres': 'str'})

@app.route('/')
def homepage():  # put application's code here
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def recommend():
    if request.method == "POST":
        wanted = request.form['wanted']
        unwanted = request.form['unwanted']
        # CHECK IF PART OF ACTUAL GENRES

        wanted_genres = wanted.split(',')
        unwanted_genres = unwanted.split(',')

        if wanted_genres and unwanted_genres:
            min_genre_match = 3

            def genre_match(row, genres):
                movie_genres = set(row.split('|'))
                return len(movie_genres.intersection(genres)) >= (
                    min_genre_match if len(genres) >= min_genre_match else len(genres))

            filtered_movies = movies[
                movies['genres'].apply(lambda x: genre_match(x, wanted_genres)) &
                ~movies['genres'].str.contains('|'.join(unwanted_genres))
                ]

            recommended_movies = []
            for movie_id in filtered_movies['movieId'].values:
                predicted_rating = model.predict(uid=0, iid=movie_id)
                recommended_movies.append((movie_id, predicted_rating.est))

            recommended_movies.sort(key=lambda x: x[1], reverse=True)

            top_recommendations = filtered_movies[
                filtered_movies['movieId'].isin([x[0] for x in recommended_movies[:10]])]
            print(top_recommendations[['title', 'genres']])

    # return redirect ??? TORCH ??? (url_for('.homepage'))

if __name__ == '__main__':
    app.run()
