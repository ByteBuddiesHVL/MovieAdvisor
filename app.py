from flask import Flask, render_template, request
import pickle

app = Flask(__name__)

with open("model_31-10-24.pkl", "rb") as file:
    model = pickle.load(file)
@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')

@app.route('/', methods=['POST'])
def recommend():
    if request.method == "POST":
        genre_list = request.form['genres']
        if genre_list:
            prediction = model.predict([genre_list])

if __name__ == '__main__':
    app.run()
