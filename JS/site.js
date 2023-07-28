const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYmQ4MTZkMzUxYTNlNTFlM2Y2MWZkNTQ0YjcyYWI3NSIsInN1YiI6IjY0YzE2ODMzMDk3YzQ5MDEwMGQxY2VkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o9PG6fS-CRYKzOKUOXPTrrThMmorQ5VC27nQmjlOF1I';

async function getMovies() {
  try {
    let response = await fetch('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
async function getMovie(movieId) {
  try {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}


async function displayMovies() {
  const movieListDiv = document.getElementById("movie-list");
  const moviePosterTemplate = document.getElementById('movie-card-template');
  let data = await getMovies();
  let movies = data.results;
  movies.forEach(movie => {//the arrow takes the place of saying function arrow function
    let movieCard = moviePosterTemplate.content.cloneNode(true);
    let titleElement = movieCard.querySelector('.card-body > h5');
    let descriptionElement = movieCard.querySelector('.card-text');
    let posterElement = movieCard.querySelector('.card img');
    let infoButton = movieCard.querySelector('button.btn');

    titleElement.textContent = movie.title;
    descriptionElement.textContent = movie.overview;
    posterElement.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
    infoButton.setAttribute('data-movieId', movie.id);

    movieListDiv.appendChild(movieCard);//add properties to the end of the string
  });
}


async function displayModal(btn) {
  const movieModal = document.getElementById('movie-modal');

  let movieId = btn.getAttribute('data-movieId');
  let movie = await getMovie(movieId);
  let titleElement = movieModal.querySelector('.modal h5');
  let posterElement = movieModal.querySelector('.modal img');
  let descriptionElement = movieModal.querySelector('.modal p');
  let linkElement = movieModal.querySelector('.modal a');

  document.getElementById('genre').innerHTML = `<strong>Genre:</strong><br/> ${movie.genres[0].name}`;
  document.getElementById('homepage').innerHTML = `<strong>Homepage:</strong><br/> <a href="${movie.homepage}">${movie.homepage}</a>`;
  document.getElementById('runtime').innerHTML = `<strong>Runtime:</strong><br/> ${movie.runtime}`;
  document.getElementById('tagline').innerHTML = `<strong>Tagline:</strong><br/> ${movie.tagline}`;


  titleElement.textContent = movie.title;
  descriptionElement.textContent = movie.overview;
  posterElement.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
  linkElement.setAttribute('href', `https://tmdb.org/movie/${movieId}`);
}

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  let length = hours + "h" + minutes + "m";
  return length;
}

