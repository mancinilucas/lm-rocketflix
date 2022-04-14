import { API_KEY, BASE_URL, IMG_URL, language } from "./api.js";

function createMovieInfo({
  poster_path,
  title = "<p>Ops, esse filme está indisponível no momento.</p>",
  overview = "",
} = {}) {
  const poster = poster_path
    ? IMG_URL + poster_path
    : "https://i.pinimg.com/564x/99/a9/33/99a93345cee50bfd2a3bc62c7a23a225.jpg";

  return `<div class="movie-info">
  <img src="${poster}">
  <div>
    <h2>${title}</h2>
    <p>
      ${overview}
    </p>
  </div>
 </div>`;
}

function appendToMovie(content) {
  const movie = document.getElementById("movie");
  movie && (movie.innerHTML = content);
}

function tap(fn) {
  return function (x) {
    fn(x);
    return x;
  };
}

function getMovieInfo() {
  const id = Math.floor(Math.random() * 1000) + 1;

  const movie_url = `${BASE_URL}${id}?${API_KEY}&${language}`;

  fetch(movie_url)
    .then((response) => response.json())
    // Get only what you need
    .then(({ poster_path, title, overview }) => ({
      poster_path,
      title,
      overview,
    }))
    // Caso queira debugar a "pipe" das promises... basta dar um tap...
    // .then(tap(console.log))
    // Create the HTML representation
    .then(createMovieInfo)
    // Then append it
    .then(appendToMovie);
}

function changeMovie() {
  getMovieInfo();
}

window.app = {
  changeMovie,
};
