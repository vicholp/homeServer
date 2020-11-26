from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import serial as sss
import time
import keyboard
import player
import urllib.parse 

hostName = "0.0.0.0"
COMM_PORT = '/dev/ttyACM0'
COMM_BAUD = "115200"
serverPort = 80

try:
    SERIAL = sss.Serial(COMM_PORT, baudrate=COMM_BAUD, timeout=5,  write_timeout=5)
    time.sleep(2)
    while(SERIAL.in_waiting):
        SERIAL.readline()
except:
    print("ERROR - Serial no disponible")

"""
def lookCommand(string):
    string = string + " "
    d_comandos = {}
    pos1 = string.find('--');

    while(pos1 != -1):
        pos2 = string.find(' ', pos1)

        if(pos2 == -1):
            print("Error en comando")
            return False

        pos3 = string.find(' ', pos2+1)

        if(pos3 == -1):
            print("Error en comando")
            return False

        d_comandos[string[pos1+2:pos2]] = string[pos2+1:pos3]
        string = string[pos3+1:]
        pos1 = string.find('--')

    return d_comandos

def plot(serial, comm, file=False, it=1000):
    
    l_in = []
    for s in range(it):
        write(serial, comm, wait=True);
        l_in.append(read(serial, p=False))

    for i in range(len(l_in)):
        l_in[i] = float(l_in[i].replace("\r\n", ""))

    if(file):
        file = open(file, 'w');
        for item in l_in:
            file.write(str(item)+'\n');
        file.close();

        return True

    plt.hist(l_in, bins=50)
    plt.gca().set(title='Frequency Histogram', ylabel='Frequency');
    plt.show()
"""
def commNew(string, serial):
    def commValidateCommand(arg):
        try:
            comm.split('-')
            int(comm[0])/1
            return True
        except:
            print('ERROR - Comando invalido')
            return False

    url = string.split('/')
    comm = url[1]
    print(url)
    print(comm)
    if url[0] == 'comm':
        if(not commValidateCommand(comm)):
            return "Not valid"

        return commToDevice('-'.join(comm[1:]), serial)

    else:
        return "Not found"

def commToDevice(string, serial):
    device_id = int(string[0])

    if(device_id == 1):
        return commToHost(string, serial)
    else:
        return commToArduino(string, serial)

def commToArduino(string, serial):
    def write(serial, string, action="", w=.01):
        serial.write( bytes(string, encoding='utf-8') );
        if(action == "read"):
            return log(serial, w)
        elif(action == "parse"):
            return parse(serial, w)
        elif(action == "flush"):
            return flush(serial, w)
        return True

    def log(serial, w=.01):
        time.sleep(w)

        while(serial.in_waiting):
            print( "<- Arduino - " +  serial.readline().decode("utf-8"), end='' )

        return "OK"

    def parse(serial, w=.01):
        time.sleep(w)

        while(serial.in_waiting):
            s = serial.readline().decode("utf-8");
            print( "<- Arduino - " +  s, end='' )
            return s;
        
        return "OK - Parse";

    def flush(serial, w=.01):
        time.sleep(w)
        while(serial.in_waiting):
            serial.readline()
        return "OK"

    action = string[1]
    if (action == 'admin'):
        return write(serial, string+"|", action="parse")
    else:
        return write(serial, string+"|", action="read")


def commToHost(string, serial):
    def doSerial(arg, serial):
        if (arg == 'start'):
            SERIAL = sss.Serial(COMM_PORT, baudrate=COMM_BAUD, timeout=5,  write_timeout=5)
            

        elif (arg == 'close'):
            serial.close()

        elif (arg == 'read'):
            read(serial);

        return 'OK'

    def doKeyboard(t, arg):
        try:
            if(t == 'click'):
                keyboard.press_and_release(arg)
            elif(t == 'longpress'):
                keyboard.press(arg)
                time.sleep(.5)
                keyboard.release(arg)
            elif(t == 'code'):
                keyboard.press_and_release(int(arg))

        except:
            print('ERROR - Tecla no existe')
    def doPlayer(action, path=""):
        if action == 'start':
            player.vlc_startPlay(urllib.parse.unquote(path))
        elif action == "playpause":
            player.vlc_playpause()
        elif action == 'play':
            player.vlc_playpause(action="play")
        elif action == 'pause':
            player.vlc_playpause(action="pause")

    action = string[1];

    if (action == 'check'):
        print("OK")

    elif (action == 'keyboard'):
        doKeyboard(string[2], string[3])

    elif (action == 'serial'):
        doSerial(string[2], serial)

    elif action == 'player':
        try:
            doPlayer(string[2], string[3])
        except:
            doPlayer(string[2])

    return "OK"




class MyServer(BaseHTTPRequestHandler):

    def getFile(self, path, m='r', b=True):
        f = open(path, m)
        if b:
            return bytes(f.read(), "utf-8")
        else:
            return f.read()

    def resolveURL(self, url):
        # home
        if (url == '/'):
            return self.getFile('web/main.html'), "text/html"

        # any html
        if (url.find('.') == -1):
            return self.getFile('web/' + url[1:] + '.html'), "text/html"

        # any file
        if (url.split('.')[-1] == 'ico'):
            return self.getFile('web/' + url[1:], m='rb', b=False), "image/x-icon"
        if (url.split('.')[-1] == 'css'):
            return self.getFile('web/' + url[1:], m='rb', b=False), "text/css"
        if (url.split('.')[-1] == 'js'):
            return self.getFile('web/' + url[1:], m='rb', b=False), "text/javascript"


        return self.getFile('web/' + url[1:] + '.html'), "text/html"
  


    def do_GET(self):
        content, c_type = self.resolveURL(self.path)
        self.send_response(200)
        self.send_header("Content-type", c_type)
        self.end_headers()
        self.wfile.write(content)
        

    def do_POST(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes(commNew(self.path[1:], SERIAL), "utf-8"))

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        BaseHTTPRequestHandler.end_headers(self)




if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Escuchando en http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")