window.addEventListener('beforeunload', e => {
  e.preventDefault();
  e.returnValue = '';
});

navigator.mediaSession.setActionHandler('play', () => player_playpause('play'));
navigator.mediaSession.setActionHandler('pause', () => player_playpause('pause'));
navigator.mediaSession.setActionHandler('previoustrack', () => playlist_move(-1));
navigator.mediaSession.setActionHandler('nexttrack', () => playlist_move(1) );


document.querySelector('#input-search').addEventListener('change', e => search(e.target.value))
document.querySelector("#audio-player").addEventListener('ended', () => playlist_move(1))
document.querySelector("#btn-nextSong").addEventListener('click', () => playlist_move(1))
document.querySelector("#btn-prevSong").addEventListener('click', () => playlist_move(-1))
document.querySelector("#btn-playpause").addEventListener('click', () => player_playpause())

document.querySelector("#btn-shuffle").addEventListener('click', () => {
  btn_play(0)
  list_shuffle("playlist")
})

document.querySelector("#btn-startPlaylist").addEventListener('click', () => {
  btn_play(0)
})

document.querySelector("#btn-appendPlaylist").addEventListener('click', () => {
  list_merge('playlist', sessionStorage.getItem("list_showing"))
  list_shuffle('playlist')
})


function search(query){
  beet_getQuery(query)
    .then(response => {
      results = response.results
      show_results(results, 'search')
      list_store('search', results)
    })
    .catch(err => console.error(err))
}

function show_info(item=0){
  let list = sessionStorage.getItem("list_showing")
  let song_id = JSON.parse(sessionStorage.getItem(`list-${list}`))[item]

  beet_getItem(song_id)
  .then(song => {
    document.querySelector("#modal-infoBody").innerHTML = ""
    for (e in song) {
      p = document.createElement("p")
      p.innerHTML = `<b>${e}</b>: ${song[e]}`
      document.querySelector("#modal-infoBody").appendChild(p)
    }
    document.querySelector("#modal-infoTitle").textContent = song.title

    $('#modal-info').modal('show')
  })

}

function show_results(songs, list){
  sessionStorage.setItem("list_showing", list);
  document.querySelector("#row-songResults").hidden = false;
  let l = document.querySelector("#cardBody-songs");
  l.innerHTML = "";

  for (const [i, song] of songs.entries()){
    let t = document.querySelector("#template-song").cloneNode(true).content;

    t.querySelector(".list-song-title").textContent = `${song.title}`
    t.querySelector(".list-song-artist").textContent = `${song.artist}`
    t.querySelector(".list-song-album").textContent = `${song.album}`
    t.querySelector(".list-song-play").onclick = () => btn_play(i);
    t.querySelector(".list-song-info").onclick = () => show_info(i);

    if (song.format === "FLAC"){
      t.querySelector(".list-song-title").classList.add('mdi')
      t.querySelector(".list-song-title").classList.add('mdi-quality-high')
    }

    l.appendChild(t);

  }
}

function btn_play(i){
  let list = sessionStorage.getItem("list_showing");
  list_clear('playlist')
  list_merge('playlist', list)
  playlist_play(i)
}

function playlist_play(id){
  sessionStorage.setItem("playlist-actual", id);
  playlist = JSON.parse(sessionStorage.getItem("list-playlist"));
  song_id = playlist[id]

  beet_getItem(song_id)
    .then(song => {

      metadata_set(song, beet_getArtUrl(song.album_id))
      player_show(song)
      player_playpause("play")


    })
    .catch(err => console.error(err))
}

function playlist_move(i){
  playlist = JSON.parse(sessionStorage.getItem("list-playlist"));
  actual = parseInt(sessionStorage.getItem("playlist-actual"));
  length = playlist.length
  nuevo = (((actual + i) % length) + length) % length;
  playlist_play(nuevo);
}

function player_show(song){
  document.querySelector("#audio-player").src = beet_getFileUrl(song.id);
  document.querySelector("#text-songTitle").textContent = song.title
  document.querySelector("#text-songArtist").textContent = song.artist
  document.querySelector("#img-songArt").src = beet_getArtUrl(song.album_id)
  document.querySelector("#row-player").hidden = false;


  const fac = new FastAverageColor();

  fac.getColorAsync(document.querySelector("#img-songArt").src)
      .then(color => document.querySelector(".container-fluid").style.backgroundColor = color.rgba)
      .catch(e => console.log(e));
}

function player_playpause(action=""){
  player = document.querySelector("#audio-player");
  if (player.paused || action === "play"){
    sessionStorage.setItem("player_playing", 'playing');
    document.querySelector("#btn-playpause").classList.remove('mdi-play')
    document.querySelector("#btn-playpause").classList.add('mdi-pause')

    player.play()

  }else if(!player.paused || action === "pause"){
    sessionStorage.setItem("player_playing", 'paused');
    document.querySelector("#btn-playpause").classList.remove('mdi-pause')
    document.querySelector("#btn-playpause").classList.add('mdi-play')

    player.pause()
  }
}





