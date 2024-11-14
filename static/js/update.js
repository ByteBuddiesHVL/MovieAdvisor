function generateMovies(movies) {
    const container = document.getElementById('resultContainer')
    container.innerHTML = ''

    let counter = 0;
    movies.forEach(movie => {
        counter++

        const movieDiv = document.createElement('div')
        movieDiv.classList.add('result')
        counter >= 4 && movieDiv.classList.add('resultS')
        movieDiv.id = movie[0]

        const omdb = movie.omdb

        const runtime = (omdb.Runtime).match(/\d+/)
        const duration = Math.floor(runtime / 60) + 'h ' + runtime % 60 + 'm'

        movieDiv.innerHTML = counter <= 3 ? `
            <img src="${omdb.Poster}" class="resImg" alt="Image poster for ${omdb.Title}">
            <div class="resContent">
                <div class="resConLeft">
                    <h1 class="resTitle">${omdb.Title}</h1>
                    <p class="resPlot">${omdb.Plot}</p>
                    <p class="resShortDesc">${omdb.Year} • ${omdb.Rated} • ${duration}</p>
                    <p class="resGenres">${omdb.Genre}</p>
                </div>
                <div class="resConRight">
                    ${omdb.imdbRating !== undefined ?
                    `<div class="resRatingS">
                        <img class="resRatingImg" src="../static/images/imdb.webp" alt="IMDb">
                        <p class="resRating">${omdb.imdbRating}/10</p>
                    </div>` : ''}
                    ${omdb.Ratings[2]?.Value !== undefined ?
                    `<div class="resRatingS">
                        <img class="resRatingImg" src="../static/images/metacritic.webp" alt="Metacritic">
                        <p class="resRating">${omdb.Ratings[2]?.Value}</p>
                    </div>` : ''}
                    ${omdb.Ratings[1]?.Value !== undefined ?
                    `<div class="resRatingS">
                        <img class="resRatingImg" src="../static/images/rotten-tomatoes.webp" alt="Rotten Tomatoes">
                        <p class="resRating">${omdb.Ratings[1]?.Value}</p>
                    </div>` : ''}
                </div>
            </div>
        ` : `
            <img src="${omdb.Poster}" class="resImg" alt="Image poster for ${omdb.Title}">
            <div class="resContent">
                <div class="resConLeft">
                    <h1 class="resTitle">${omdb.Title}</h1>
                    <p class="resShortDesc">${omdb.Year} • ${omdb.Rated} • ${duration}</p>
                    <p class="resGenres">${omdb.Genre}</p>
                </div>
                <div class="resConRight resConRightS">
                    ${omdb.Ratings[1]?.Value !== undefined ?
                    `<div class="resRatingS">
                        <img class="resRatingImg" src="../static/images/rotten-tomatoes.webp" alt="Rotten Tomatoes">
                        <p class="resRating">${omdb.Ratings[1]?.Value}</p>
                    </div>` : ''}
                    ${omdb.Ratings[2]?.Value !== undefined ?
                    `<div class="resRatingS">
                        <img class="resRatingImg" src="../static/images/metacritic.webp" alt="Metacritic">
                        <p class="resRating">${omdb.Ratings[2]?.Value}</p>
                    </div>` : ''}
                    ${omdb.imdbRating !== undefined ?
                    `<div class="resRatingS">
                        <img class="resRatingImg" src="../static/images/imdb.webp" alt="IMDb">
                        <p class="resRating">${omdb.imdbRating}/10</p>
                    </div>` : ''}
                </div>
            </div>
        `;

        container.appendChild(movieDiv);
    })
}