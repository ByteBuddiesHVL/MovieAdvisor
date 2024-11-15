const availGenres = [
    "Action","Adventure","Animation","Children","Comedy","Crime","Documentary","Drama","Fantasy","Film-Noir","Horror","Musical","Mystery","Romance","Sci-Fi","Thriller","War","Western"
]

const preWantedGenres = ["Action","Drama","Thriller"]
const preUnwantedGenres = ["Fantasy"]

const wOverlay = document.getElementById('wantedOverlay')
const uwOverlay = document.getElementById('unwantedOverlay')
const wContainer = document.getElementById('wantedContainer')
const uwContainer = document.getElementById('unwantedContainer')

preWantedGenres.forEach(genre => {
    wContainer.appendChild(genElement(genre,toggleGenre))
})
preUnwantedGenres.forEach(genre => {
    uwContainer.appendChild(genElement(genre,toggleUGenre))
})
availGenres.filter(genre => !preWantedGenres.includes(genre)).forEach(genre => {
    wOverlay.appendChild(genElement(genre,toggleGenre))
})
availGenres.filter(genre => !preUnwantedGenres.includes(genre)).forEach(genre => {
    uwOverlay.appendChild(genElement(genre,toggleUGenre))
})

function genElement(genre, onclick) {
    let genreEl = document.createElement('span')
    genreEl.classList.add('genreButton')
    genreEl.onclick = () => onclick(genreEl)
    genreEl.textContent = genre
    return genreEl
}

function toggleOverlay() {
    wOverlay.classList.toggle('active')
}
function toggleUOverlay() {
    uwOverlay.classList.toggle('active')
}

function toggleGenre(genreElement) {
    if (wContainer.contains(genreElement)) {
        wOverlay.appendChild(genreElement)
    } else {
        wContainer.appendChild(genreElement)
    }
}
function toggleUGenre(genreElement) {
    if (uwContainer.contains(genreElement)) {
        uwOverlay.appendChild(genreElement)
    } else {
        uwContainer.appendChild(genreElement)
    }
}

document.addEventListener('click', function(event) {
    const plusSymbol = document.getElementById('addWantedBtn')
    if (!wOverlay.contains(event.target) && !plusSymbol.contains(event.target)) {
        wOverlay.classList.remove('active')
    }

    const plusUSymbol = document.getElementById('addUnwantedBtn')
    if (!uwOverlay.contains(event.target) && !plusUSymbol.contains(event.target)) {
        uwOverlay.classList.remove('active')
    }
})