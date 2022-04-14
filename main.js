import { API_KEY, BASE_URL, IMG_URL, language } from './api.js'

function getMovieInfo() {
  const id = Math.floor(Math.random() * 1000) + 1

  const movie_url = `${BASE_URL}${id}?${API_KEY}&${language}`
  fetch(movie_url)
    .then(response => response.json())
    .then(data => {
      movie.innerHTML = `
       <div class="movie-info">
        <img src="${
          data.poster_path
            ? IMG_URL + data.poster_path
            : 'https://i.pinimg.com/564x/99/a9/33/99a93345cee50bfd2a3bc62c7a23a225.jpg'
        }">
        <div>
          <h2>${
            data.title
              ? data.title
              : '<p>Ops, esse filme está indisponível no momento.</p>'
          }</h2>
          <p>
            ${data.overview ? data.overview : ''}
          </p>
        </div>
       </div>
       `
    })
}

const buttonMovie = document.getElementById('buttonMovie')

function changeMovie() {
  getMovieInfo()
}

buttonMovie.addEventListener('click', changeMovie)
