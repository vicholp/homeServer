$('#carousel-trending').on('slide.bs.carousel', (e) => {
  setBackground(tmdb_image(document.querySelectorAll(".carousel-item")[e.to].dataset.backdrop))
});

document.querySelector('#input-search').addEventListener('change', function(e){
  console.log('buscando:' + e.target.value)
  window.location.href = `/notflix/search?arg=${encodeURIComponent(e.target.value)}`
})

tmdb_getTrending()
  .then(movies => {
    console.log(movies)

    let a = Math.floor(Math.random() * 17);

    movies = movies.results.slice(a,a+3)

    setBackground(tmdb_image(movies[0].backdrop_path))
    let items = document.querySelectorAll(".carousel-item")
    for (const [i, item] of items.entries()) {
      item.querySelector('img').src = tmdb_image(movies[i].poster_path)
      item.querySelector('a').href = `/notflix/movie?id=${movies[i].id}`
      item.dataset.backdrop = movies[i].backdrop_path;
    }
  })

torrent_getTorrents("YTS", "downloading")
.then(torrents => {
  if (torrents.length == 0) return false

  let i = Math.floor(Math.random() * torrents.length);
  let master_id = torrents[i].name;

  for (torrent of torrents){
    let id = torrent.name;
    displayTorrent(torrent, id, (id == master_id));
  }

});


function displayTorrent(torrent, id, backgroundImage){
  let card = document.querySelector("#card-downloading")

  fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`, {method: "GET"})
    .then(response => response.json())
    .then(movie => {
      let t = document.querySelector("#template-card-downloading").cloneNode(true).content
      t.querySelector("h6").textContent = movie.data.movie.title
      t.querySelector(".progress-bar").style.width = `${torrent.progress * 100}%`
      t.querySelector("a").href = "/notflix/movie?id=" + id
      card.appendChild(t)
      if (backgroundImage) {
        document.querySelector(".container-fluid").style.backgroundImage = 'url(' + movie.data.movie.background_image_original + ')'
      }

    });
}


