const leonJson = {"Title":"Léon: The Professional","Year":"1994","Rated":"R","Released":"18 Nov 1994","Runtime":"110 min","Genre":"Action, Crime, Drama","Director":"Luc Besson","Writer":"Luc Besson","Actors":"Jean Reno, Gary Oldman, Natalie Portman","Plot":"12-year-old Mathilda is reluctantly taken in by Léon, a professional assassin, after her family is murdered. An unusual relationship forms as she becomes his protégée and learns the assassin's trade.","Language":"English, Italian, French","Country":"France, United States","Awards":"5 wins & 16 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BNGRkYTNhOWQtYmI0Ni00MjZhLWJmMzAtMTA2Mjg4NGNiNDU0XkEyXkFqcGc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.5/10"},{"Source":"Rotten Tomatoes","Value":"75%"},{"Source":"Metacritic","Value":"64/100"}],"Metascore":"64","imdbRating":"8.5","imdbVotes":"1,271,727","imdbID":"tt0110413","Type":"movie","DVD":"N/A","BoxOffice":"$19,501,238","Production":"N/A","Website":"N/A","Response":"True"}

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const wanted = document.getElementById('wanted').value;
    const unwanted = document.getElementById('unwanted').value;

    fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({wanted: wanted, unwanted: unwanted})
    })
        .then(response => response.json())
        .then(data => {
            let result = []
            for (let item in data.result) {
                result.push({...item, omdb: leonJson});
            }
            console.log(result);
            generateMovies(result)
        })
        .catch(error => console.log('Error:', error));
})