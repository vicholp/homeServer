
beet_setPlayingDevice(sessionStorage.getItem('playing_device') || 'self')

search = document.querySelector('#input-search')
  search.addEventListener('change', function(){
    console.log('buscando:' + search.value)
    beet_search(search.value)
  })

document.querySelector("#btn-nextSong").addEventListener('click', function(){
	beet_movePlaylist(1);
})
document.querySelector("#btn-prevSong").addEventListener('click', function(){
	beet_movePlaylist(-1);
})
document.querySelector("#btn-player-play").addEventListener('click', function(){
	beet_playpause();
})

navigator.mediaSession.setActionHandler('play', function(){ beet_playpause("play")});
navigator.mediaSession.setActionHandler('pause', function(){ beet_playpause("pause")});
navigator.mediaSession.setActionHandler('previoustrack', function(){ beet_movePlaylist(-1)});
navigator.mediaSession.setActionHandler('nexttrack', function(){ beet_movePlaylist(1)});

function setMediaMetadata(item, image){
	navigator.mediaSession.metadata = new MediaMetadata({
	    title: item.title,
	    artist: item.artist,
	    album: item.album,
	    artwork: [
	      { src: image, sizes: '512x512', type: 'image/png' },
	    ]
  	});
}

if (sessionStorage.getItem('player_playing') == 'playing'){
	document.querySelector('#btn-resumePlaylist').hidden = false
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


function beet_resume(){
	document.querySelector('#btn-resumePlaylist').hidden = true
	playlist= JSON.parse(sessionStorage.getItem("playlist"))
	item = parseInt(sessionStorage.getItem('playlist_actual'))
	console.log(item)
	beet_startPlaylist('playlist', item)
}


function beet_setPlayingDevice(device, play=false){
	playing_device = device
	sessionStorage.setItem('playing_device', device)

	btn = document.querySelector("#btn-remotePlay")
	if (device === "notebook"){
		btn.classList.remove("btn-secondary")
		btn.classList.add("btn-success")
		btn.setAttribute( "onClick", "beet_setPlayingDevice('self', true)" );
	}else if (device === "self"){
		beet_remoteAction('pause')
		btn.classList.add("btn-secondary")
		btn.classList.remove("btn-success")
		btn.setAttribute( "onClick", "beet_setPlayingDevice('notebook', true)" );
	}
	console.log(play)
	if (play){
		playlist = sessionStorage.getItem('playlist_nombre')
		item = sessionStorage.getItem('playlist_actual')
		beet_play(playlist, item)
	}

}

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

function beet_info(playlist, item=0){
	song = JSON.parse(sessionStorage.getItem(playlist))[item]
	JSON.stringify(song, undefined, 2)
	document.querySelector("#modal-infoBody").innerHTML = ""
	for (e in song) {
		p = document.createElement("p")
		p.innerHTML = `<b>${e}</b>: ${song[e]}`
		document.querySelector("#modal-infoBody").appendChild(p)
	}
	document.querySelector("#modal-infoTitle").textContent = song.title

	$('#modal-info').modal('show')
}

function beet_remoteAction(action, arg=false){
	if (arg){
		fetch(`${url}/1/player/${action}/${arg}`, {method: 'POST'})
	}else{
		fetch(`${url}/1/player/${action}`, {method: 'POST'})
	}
	
}

function beet_play(list, item){
	player = document.querySelector("#audio-player");
	song = JSON.parse(sessionStorage.getItem(list))[item]
	id = song.id

	setMediaMetadata(song, `${url}:${beet_port}/album/${song.album_id}/art`)
	sessionStorage.setItem("playlist_actual", item);
	sessionStorage.setItem("playlist_nombre", classList);
	
	player.src = `${url}:${beet_port}/item/${id}/file`

	document.querySelector("#text-songTitle").textContent = song.title
	document.querySelector("#text-songArtist").textContent = song.artist
	document.querySelector("#img-songArt").src = `${url}:${beet_port}/album/${song.album_id}/art`

	document.querySelector("#row-player").hidden = false

	if (playing_device !== "self"){
		player.muted = true;
		beet_remoteAction('start', encodeURIComponent(song.path))
	}else{
		player.muted = false;
	}

	beet_playpause("play")
}

function player_pause(player=false){
	if (playing_device !== "self"){
		beet_remoteAction('pause')
	}else{
		player.pause()
	}
}
function player_play(player=false){
	if (playing_device !== "self"){
		beet_remoteAction('play')
	}else{
		player.play()
	}
}

function beet_playpause(action=""){
	player = document.querySelector("#audio-player");
	if (player.paused || action === "play"){
		sessionStorage.setItem("player_playing", 'playing');
		document.querySelector("#btn-player-play").classList.remove('mdi-play')
		document.querySelector("#btn-player-play").classList.add('mdi-pause')
		
		player_play(player)
	
	}else if(!player.paused || action === "pause"){
		sessionStorage.setItem("player_playing", 'paused');
		document.querySelector("#btn-player-play").classList.remove('mdi-pause')
		document.querySelector("#btn-player-play").classList.add('mdi-play')
		
		player_pause(player)
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

