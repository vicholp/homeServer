function torrentLogin(){
  fetch(`${url_torrent}/api/v2/auth/login?username=admin&password=admin123`,{})
  .then(response => console.log(response))
}
function getListTorrentDownloading(){
  return fetch(`${url_torrent}/api/v2/torrents/info?category=YTS&filter=downloading`, {})
  .then(response => response.json())
  .then(response => response)
}
function addTorrent(magnet, title){
  fetch(`${url_torrent}/api/v2/torrents/add?urls=${magnet}&category=YTS&autoTMM=true`, {})
  .then(response => response.json())
  .then(response => console.log(response))
}
