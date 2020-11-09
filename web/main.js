const url = "http://192.168.1.5"
const beet_port = "9000"


function sendCommand(cmd){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", `${url}/${cmd}`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
}