tmdb_search((new URL(document.location)).searchParams.get('arg'))
.then(movies => {

  let row = document.querySelector("#row-movies")
  for (movie of movies.results) {
    let t = document.querySelector("#template-card-movie").cloneNode(true).content
    t.querySelector("img").src = tmdb_image(movie.poster_path)
    t.querySelector("#template-movie-title").textContent = movie.title
    t.querySelector("#template-movie-year").textContent = movie.release_date.split('-')[0]
    t.querySelector("a").href = `/notflix/movie?id=${movie.id}`
    row.appendChild(t);
  }

  return movies

});

document.querySelector("#input-search").value = (new URL(document.location)).searchParams.get('arg')

document.querySelector('#input-search').addEventListener('change', function(e){
  console.log('buscando:' + e.target.value)
  window.location.href = `/notflix/search?arg=${encodeURIComponent(e.target.value)}`
})




