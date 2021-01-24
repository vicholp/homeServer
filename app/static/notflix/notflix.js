document.querySelector('#input-search').addEventListener('change', function(e){
  console.log('buscando:' + e.target.value)
  window.location.href = `/notflix/search?arg=${encodeURIComponent(e.target.value)}`
})

function getLastUploaded(){
  fetch('https://yts.mx/api/v2/list_movies.json?sort_by=date_added&limit=10', {method: "GET"})
  .then(response => response.json())
  .then(movie => {
    console.log(result)
    c = movie
    document.querySelector('#movie-header').src = movie.large_cover_image

  })
}

async function ytsGetMovieDetails(id){
  return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`, {method: "GET"})
  .then(response => response.json())
}
