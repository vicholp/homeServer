let params = (new URL(document.location)).searchParams;
let arg = params.get('arg')
getMovieDetails(arg)

document.querySelector("#input-search").value = arg

document.querySelector('#input-search').addEventListener('change', function(e){
  console.log('buscando:' + e.target.value)
  window.location.href = `/notflix/search?arg=${encodeURIComponent(e.target.value)}`
})

function getMovieDetails(arg){
  fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${arg}&sort_by=rating`, {method: "GET"})
  .then(response => response.json())
  .then(movies => {
    console.log(movies);


    let row = document.querySelector("#row-movies")

    for (movie of movies.data.movies) {
      let t = document.querySelector("#template-card-movie").cloneNode(true).content
      t.querySelector("#template-img-header").src = movie.medium_cover_image
      t.querySelector("#template-movie-title").textContent = movie.title
      t.querySelector("#template-movie-year").textContent = movie.year
      t.querySelector("#template-movie-details").href = `/notflix/movie?id=${movie.id}`
      row.appendChild(t);
    }

    return movies

  })
}
