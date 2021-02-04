const OMDB_key = 'e7ddb619'

let params = (new URL(document.location)).searchParams;

ytsGetMovieDetails(params.get('id'))
  .then(movie => {
    console.log(movie);

    document.querySelector('#movie-header').src = movie.data.movie.large_cover_image
    document.querySelector('#movie-title').textContent = movie.data.movie.title
    document.querySelector('#movie-year').textContent = movie.data.movie.year
    document.querySelector('#movie-desc').textContent = movie.data.movie.description_full
    document.querySelector('#movie-duration').textContent = ` Duracion: ${movie.data.movie.runtime} minutos`
    document.querySelector('#movie-genres').textContent = ' ' + movie.data.movie.genres.join(', ')
    document.querySelector('#movie-imdb').href = 'https://www.imdb.com/title/' + movie.data.movie.imdb_code

    let btns = document.querySelector("#btnGroup-download")
    for (torrent of movie.data.movie.torrents){
      console.log(torrent)
      let t = document.querySelector("#template-btn-download").cloneNode(true).content
      t.querySelector("button").textContent = `${torrent.quality}`
      t.querySelector("button").dataset.url = torrent.url
      t.querySelector("button").dataset.hash = torrent.hash
      t.querySelector("button").dataset.id = movie.data.movie.id
      t.querySelector("button").addEventListener('click', function (e) {
        let b = e.target
        addTorrent(b.dataset.url, b.dataset.id, b.dataset.hash)
      })
      btns.appendChild(t);
    }
    let t = document.querySelector("#template-btn-download")
    t.parentNode.removeChild(t)

    document.querySelector(".container-fluid").style.backgroundImage = 'url(' + movie.data.movie.background_image_original + ')'

    getMovieScore(movie.data.movie.imdb_code)
    return movie;
  })



function magnet(title, hash){
  return `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(title)}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337`
}
function getMovieScore(id){
  fetch(`http://www.omdbapi.com/?apikey=${OMDB_key}&i=${id}`)
  .then(response => response.json())
  .then(movie => {
    console.log(movie)

    for (c of movie.Ratings){
      document.querySelector(`#movie-${c.Source.replaceAll(' ', '-')}`).textContent = c.Source + ": " +  c.Value
    }
  })
}
