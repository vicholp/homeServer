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


def runPing():
	param = '-n' if platform.system().lower()=='windows' else '-c'

	command = ['ping', param, '1', 'google.com']

	return subprocess.call(command) == 0
