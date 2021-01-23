getTorrents()
async function getTorrents(){
  getListTorrentDownloading()
  .then(torrents => showTorrents(torrents))
}

function showTorrents(torrents){
  let card = document.querySelector("#card-downloading")
  for (torrent of torrents){
    console.log(torrent)
    let t = document.querySelector("#template-card-downloading").cloneNode(true).content
    t.querySelector(".card-title").textContent = torrent.name.split('(')[0]
    t.querySelector(".progress-bar").style.width = `${torrent.progress * 100}%`
    card.appendChild(t)
  }
}

