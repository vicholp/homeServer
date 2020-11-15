import vlc
import time

vlc_instance = vlc.Instance("-A ALSA,none --alsa-audio-device hw:1,0")
vlc_player = vlc_instance.media_player_new()

def vlc_startPlay(path):
	print("PATH-->", path)
	vlc_player.set_media(vlc_instance.media_new(path))
	vlc_player.play()

def vlc_togglePause():
	vlc_player.pause()


