const OMDB_KEY = "e7ddb619"
const TMDB_KEY = "0c7f0b598f09621bc4e40e0da73d83b6"

function mkv_getMovies(){
  return fetch(`${url_mkv}/api/movies`, {method: "GET"})
    .then(response => response.json())
    .then(movies => movies);
}

function mkv_getSubs(id){
  return fetch(`${url_mkv}/api/movies/subs/${id}`)
    .then(response => response.json());
}

function mkv_download(data){
  fetch(`${url_mkv}/api/movies/download`, {
    headers: {'Content-Type': 'application/json'},
    method: "POST",
    body: JSON.stringify(data)})
  .then(response => response.json())
  .then(response => console.log(response))
}

function tmdb_search(query, item="movie", page=1){
  return fetch(`${tmdb_url}/search/${item}?` + new URLSearchParams({
    "api_key": TMDB_KEY,
    "query": query,
    "include_adult": false,
    "page": page
  }))
  .then(response => response.json());
}

function tmdb_getDetails(id, item="movie", append=""){
  return fetch(`${tmdb_url}/movie/${id}?` + new URLSearchParams({
    "api_key": TMDB_KEY,
    "append_to_response": append
  }), {"method": "GET"})
  .then(response => response.json());
}

function tmdb_getProviders(id){
  return fetch(`${tmdb_url}/movie/${id}/watch/providers?` + new URLSearchParams({
    "api_key": TMDB_KEY,
  }), {"method": "GET"})
  .then(response => response.json());
}

function tmdb_getTrending(){
  return fetch(`${tmdb_url}/trending/movie/week?` + new URLSearchParams({
    "api_key": TMDB_KEY,
  }), {"method": "GET"})
  .then(response => response.json());
}

function tmdb_image(path){
  return "https://image.tmdb.org/t/p/original/" + path
}


function yts_getMovieDetails(id){
  return fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${id}`, {method: "GET"})
  .then(response => response.json())
}

function yts_search(arg){
  return fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${arg}&sort_by=rating`, {method: "GET"})
  .then(response => response.json())
}


function omdb_getMovieDetails(id){
  return fetch(`http://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${id}`)
  .then(response => response.json())

}
