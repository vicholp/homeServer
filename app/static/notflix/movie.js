tmdb_getDetails((new URL(document.location)).searchParams.get('id'), 'movie', "images,videos")
  .then(movie => {
    document.querySelector('#movie-header').src = tmdb_image(movie.images.posters[0].file_path)
    document.querySelector('#movie-title').textContent = movie.title
    document.querySelector('#movie-year').textContent = movie.release_date
    document.querySelector('#movie-desc').textContent = movie.overview
    document.querySelector('#movie-duration').textContent = ` Duracion: ${movie.runtime} minutos`
    document.querySelector('#movie-genres').textContent = ' '
    document.querySelector('#movie-imdb').href = 'https://www.imdb.com/title/' + movie.imdb_id
    document.querySelector(".container-fluid").style.backgroundImage = 'url(' + tmdb_image(movie.images.backdrops[0].file_path) + ')'
    document.querySelector("#btn-addToWishlist").addEventListener('click', (e) => addToWishlist(movie.data.movie.id));

    omdb_getMovieDetails(movie.imdb_id)
      .then(movie => {
        for (c of movie.Ratings){
          document.querySelector(`#movie-${c.Source.replaceAll(' ', '-')}`).textContent = c.Source + ": " +  c.Value
        }
      });

    mkv_getSubs(movie.imdb_id)
      .then(sub => {
        if (sub.result == false) document.querySelector("#btn-download-subs").classList.add('disabled')
        document.querySelector("#btn-download-subs").href = sub.result
      });

    yts_getMovieDetails(movie.imdb_id)
      .then(yts => {
        yts = yts.data.movies[0];
        let btns = document.querySelector("#btnGroup-offline");
        for (const torrent of yts.torrents){
          let t = document.querySelector("#template-btn-offline").cloneNode(true).content;
          let btn = t.querySelector("button");
          btn.textContent = `YTS - ${torrent.quality}`;
          btn.dataset.imdb_id = movie.imdb_id;
          btn.dataset.tmdb_id = movie.id;
          btn.dataset.yts_id = yts.id;
          btn.dataset.movie = JSON.stringify(movie);
          btn.dataset.torrent_url = torrent.url;
          btn.dataset.torrent_hash = torrent.hash;
          btn.addEventListener('click', e => mkv_download(e.target.dataset))
          btns.appendChild(t);
        }
      });

    tmdb_getProviders(movie.id)
      .then(providers => {

        //providers = providers.results.CL.flatrate

      });
  });

function addToWishlist(id){
  console.log(id)
}



