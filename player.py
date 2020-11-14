import vlc
import time

vlc_instance = vlc.Instance()
vlc_player = vlc_instance.media_player_new()

def vlc_startPlay(path):
	vlc_player.set_media(vlc_instance.media_new(path))
	vlc_player.play()

def vlc_togglePause():
	vlc_player.pause()


