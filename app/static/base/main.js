const url_arduino = "http://192.168.1.6"
const url_host = "http://192.168.1.5"
const beet_port = "9000"

async function sendCommand(cmd){

  var formdata = new FormData();
  formdata.append("command", cmd);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

	return fetch(`${url_arduino}/api/command`, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.error(error));
}
