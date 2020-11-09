import platform
import subprocess
import speedtest
from hurry.filesize import size


def runSpeedTest():
	threads = None

	s = speedtest.Speedtest()
	s.get_servers()
	s.get_best_server()
	s.download()
	s.upload()

	result = s.results.dict()

	download = result['download'];
	upload = result['upload'];
	ping = result['ping'];

	print('Download speed: ' + size(download));
	print('Upload speed: ' + size(upload));
	print('Ping: ' + str(ping))

	return download, upload

def runPing(host):

	param = '-n' if platform.system().lower()=='windows' else '-c'

	# Building the command. Ex: "ping -c 1 google.com"
	command = ['ping', param, '1', '192.168.1.2']

	return subprocess.call(command) == 0
