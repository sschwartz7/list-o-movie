const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYmQ4MTZkMzUxYTNlNTFlM2Y2MWZkNTQ0YjcyYWI3NSIsInN1YiI6IjY0YzE2ODMzMDk3YzQ5MDEwMGQxY2VkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o9PG6fS-CRYKzOKUOXPTrrThMmorQ5VC27nQmjlOF1I'

async function getMovies(){
  try{
    let response = await fetch('https://api.themoviedb.org/3/movie/popular',{
    headers: {
        'Authorization': `Bearer ${API_KEY}`
    }
  });
  let data = await response.json();
  return data;
  }catch(error){
    console.error(error);
  }
}

async function displayMovies(){
    const movieListDiv = document.getElementById("movie-list");
    const moviePosterTemplate = document.getElementById('movie-card-template');
    let data= await getMovies();
    let movies = data.results;
    movies.forEach(movie => {//the arrow takes the place of saying function arrow function
        let movieCard = moviePosterTemplate.content.cloneNode(true);
        let titleElement = movieCard.querySelector('.card-body > h5');
        let descriptionElement = movieCard.querySelector('.card-body > p');
        let posterElement = movieCard.querySelector('.card > img');
        titleElement.textContent= movie.title;
        descriptionElement.textContent=movie.overview;
        posterElement.innerHTML = 
        movieListDiv.appendChild(movieCard);
    });
}


