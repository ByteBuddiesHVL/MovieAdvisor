function generateMovies(movies) {
    const container = document.getElementById('resultContainer')

    movies.forEach(movie => {

        const movieDiv = document.createElement('div')
        movieDiv.classList.add('result')
        movieDiv.id = movie[0]

        const omdb = movie.omdb

        const runtime = (omdb.Runtime).match(/\d+/)
        const duration = Math.floor(runtime / 60) + 'h ' + runtime % 60 + 'm'

        movieDiv.innerHTML = `
            <img src="${omdb.Poster}" class="resImg" alt="Image poster for ${omdb.Title}">
            <div class="resContent">
                <div class="resConLeft">
                    <h1 class="resTitle">${omdb.Title}</h1>
                    <p class="resPlot">${omdb.Plot}</p>
                    <p class="resShortDesc">${omdb.Year} • ${omdb.Rated} • ${duration}</p>
                    <p class="resGenres">${omdb.Genre}</p>
                </div>
                <div class="resConRight">
                    <p class="resRating">IMDb: ${omdb.imdbRating}/10</p>
                    <p class="resRating">Rotten Tomatoes: ${omdb.Ratings[1].Value}</p>
                    <p class="resRating">Metacritic: ${omdb.Ratings[2].Value}</p>
                </div>
            </div>
        `;

        container.appendChild(movieDiv);
    })

}