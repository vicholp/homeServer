import vlc
import time

vlc_instance = vlc.Instance("-A ALSA,none --alsa-audio-device hw:1,0")
vlc_player = vlc_instance.media_player_new()

def vlc_startPlay(path):
	vlc_player.set_media(vlc_instance.media_new(path))
	
def vlc_playpause(action=False):
	if not action:
		vlc_player.pause()
	else:
		if action == "play" and not vlc_player.is_playing():
			vlc_player.pause()
		elif action == "pause" and vlc_player.is_playing():
			vlc_player.pause()



