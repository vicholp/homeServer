function torrentLogin(){
  fetch(`${url_torrent}/api/v2/auth/login?username=admin&password=admin123`,{})
  .then(response => console.log(response))
}
function getListTorrentDownloading(){
  return fetch(`${url_torrent}/api/v2/torrents/info?category=YTS&filter=downloading`, {})
  .then(response => response.json())
  .then(response => response)
}
function addTorrent(hash, id){

  let body =
  fetch(`http://localhost:5000/api/movies/download`, {
    headers: {'Content-Type': 'application/json'},
    method: "POST",
    body: JSON.stringify({ "id": id, "hash": hash })
  })
  .then(response => response.json())
  .then(response => console.log(response))
}
