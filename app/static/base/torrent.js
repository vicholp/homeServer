function torrentLogin(){
  fetch(`${url_qbittorrent}/api/v2/auth/login?username=admin&password=admin123`,{})
  .then(response => console.log(response))
}
function torrent_getTorrents(category="", filter=""){
  return fetch(`${url_qbittorrent}/api/v2/torrents/info?category=${category}&filter=${filter}`, {})
  .then(response => response.json())
  .then(response => response)
}

