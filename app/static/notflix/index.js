getTorrents()
async function getTorrents(){
  getListTorrentDownloading()
  .then(torrents => {
    let i = Math.floor(Math.random() * torrents.length);

    let master_id = torrents[i].name

    for (torrent of torrents){
      console.log(torrent)

      let id = torrent.name

      backgroundImage = (id == master_id)

      displayTorrent(torrent, id, backgroundImage)

    }
  })

}

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

    })
}
