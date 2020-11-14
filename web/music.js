var songs;
var albums;

var resultados

search = document.querySelector('#input-search')
  search.addEventListener('change', function(){
    console.log('buscando:' + search.value)
    beet_search(search.value)
  })

if (sessionStorage.getItem('player_playing') == 'playing'){
	document.querySelector('#btn-resumePlaylist').hidden = false
}
function beet_resume(){
	document.querySelector('#btn-resumePlaylist').hidden = true
	playlist= JSON.parse(sessionStorage.getItem("playlist"))
	item = parseInt(sessionStorage.getItem('playlist_actual'))
	console.log(item)
	beet_startPlaylist('playlist', item)
}


document.querySelector("#btn-nextSong").addEventListener('click', function(){
	beet_movePlaylist(1);
})
document.querySelector("#btn-prevSong").addEventListener('click', function(){
	beet_movePlaylist(-1);
})
document.querySelector("#btn-player-play").addEventListener('click', function(){
	beet_playpause();
})



function beet_search(arg){
	document.querySelector("#row-songResults").hidden = true;
	fetch(`${url}:${beet_port}/item/query/${arg}`, {method: 'GET'})
	  .then( function(response) {
	    if (response.status !== 200) return false;
	      response.json().then(function(data) {
	      	beet_showResults(data['results'])
	      }
	    );
	  }
	)
}
function beet_showResults(results){
	sessionStorage.setItem("searchResults", JSON.stringify(results));
	document.querySelector("#row-songResults").hidden = false;
	table = document.querySelector("#tableBody-songs");
	table.innerHTML = "";

	for (const [i, song] of results.entries()){

  	songT = document.querySelector("#template-song").cloneNode(true);
    td = songT.content.querySelectorAll("td")


    td[0].children[0].textContent = `${song.title}`
    td[0].children[1].textContent = `${song.artist}`
    td[1].textContent = `${song.album}`
    td[2].children[0].children[0].setAttribute('onclick',`beet_play('searchResults', ${i})`);
    td[2].children[0].children[1].setAttribute('onclick',`beet_info('searchResults', ${i})`);

    if (song.format === "FLAC"){
    	td[0].children[0].classList.add('mdi')
    	td[0].children[0].classList.add('mdi-quality-high')
    }

    table.appendChild(songT.content);

  }
  resultados = results

}

function beet_info(){

}

function beet_play(list, item){
	song = JSON.parse(sessionStorage.getItem(list))[item]
	id = song.id
	player = document.querySelector("#audio-player");
	player.src = `${url}:${beet_port}/item/${id}/file`
	document.querySelector("#text-songTitle").textContent = song.title
	document.querySelector("#text-songArtist").textContent = song.artist

	document.querySelector("#img-songArt").src = `${url}:${beet_port}/album/${song.album_id}/art`

	sessionStorage.setItem("player_playing", 'playing');
	sessionStorage.setItem("playlist_actual", item);

	document.querySelector("#row-player").hidden = false
	document.querySelector("#btn-player-play").classList.remove('mdi-play')
	document.querySelector("#btn-player-play").classList.add('mdi-pause')
	player.play()
}

function beet_setRemotePlayer(){
	path = encodeURIComponent('/home/vicente/Music/Rammstein/Mutter/09 Rein raus.flac')
	fetch(`${url}/1/player/play/${path}`, {method: 'POST'})
		
}

function beet_playpause(){
	player = document.querySelector("#audio-player");
	if (player.paused){
		player.play()
		sessionStorage.setItem("player_playing", 'playing');
		document.querySelector("#btn-player-play").classList.remove('mdi-play')
		document.querySelector("#btn-player-play").classList.add('mdi-pause')
	
	}else{
		player.pause()
		sessionStorage.setItem("player_playing", 'paused');
		document.querySelector("#btn-player-play").classList.remove('mdi-pause')
		document.querySelector("#btn-player-play").classList.add('mdi-play')
		
	}
	
}

function beet_startPlaylist(playlist_name, item, shuffle=false, name=""){
	playlist = JSON.parse(sessionStorage.getItem(playlist_name))
	if (shuffle){
		playlist = shuffleArray(playlist)
	}
	sessionStorage.setItem("playlist", JSON.stringify(playlist));
	sessionStorage.setItem("playlist_actual", item);
	sessionStorage.setItem("playlist_nombre", name);
	beet_play('playlist', item)
	document.querySelector("#audio-player").addEventListener('ended', function(){
		beet_movePlaylist(1)
	})
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function beet_movePlaylist(i){
	playlist = JSON.parse(sessionStorage.getItem("playlist"));
	actual = parseInt(sessionStorage.getItem("playlist_actual"));
	length = playlist.length
	nuevo = (((actual + i) % length) + length) % length;
	sessionStorage.setItem("playlist_actual", nuevo);
	beet_play('playlist', nuevo);
}

function Search(arg){
	document.querySelector('#input-search').value = arg
	beet_search(arg)

}

fetch(`${url}:${beet_port}/item/`, {method: 'GET'})
  .then( function(response) {
  	console.log(response.status)
    if (response.status !== 200)  return false;
      response.json().then(function(data) {
        songs = data
      }
    );
  }
)
  fetch(`${url}:${beet_port}/album/`, {method: 'GET'})
  .then( function(response) {
  	console.log(response.status)
    if (response.status !== 200)  return false;
      response.json().then(function(data) {
        albums = data
      }
    );
  }
)
fetch(`${url}:${beet_port}/album/1/art`, {method: 'GET'})
  .then( function(response) {
  	console.log(response.status)
    if (response.status !== 200)  return false;
      response.json().then(function(data) {
        console.log(data)
      }
    );
  }
)
