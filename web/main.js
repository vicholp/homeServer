const url = "http://192.168.1.5"
const beet_port = "9000"


function sendCommand(cmd){
  fetch(`${url}/${cmd}`, {method: 'POST'})
    .then( function(response) {
      if (response.status !== 200)  return false;
        response.json().then(function(data) {
          return data
        }
      ).catch(err => console.log(response))
    })
    .catch(err => false);
}
