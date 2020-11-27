const url = "http://192.168.1.5"
const beet_port = "9000"

async function sendCommand(cmd){
	return fetch(`${url}/${cmd}`, {method: 'POST'})
	    .then( function(response) {
	      if (response.status !== 200)  return false;
	        response.text().then(function(data) {
	        	console.log("main")
	        	datas = data
	          	return data
	        }
	      ).catch(err => console.log("ERROR"))
	    })
    .catch(err => false);
}
