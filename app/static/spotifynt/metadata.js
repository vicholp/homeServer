function metadata_set(item, image){
  navigator.mediaSession.metadata = new MediaMetadata({
      title: item.title,
      artist: item.artist,
      album: item.album,
      artwork: [
        { src: image, sizes: '512x512', type: 'image/png' },
      ]
    });
}
