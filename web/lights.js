fetch(`${url}/0/admin/led/getValue/1`, {method: 'POST'})
  .then( function(response) {
    if (response.status !== 200) return false
      response.json().then(function(data) {
        document.querySelector('#input-led-1').value = data
      }
    );
  })
  .catch(err => false);

fetch(`${url}/0/admin/led/getValue/0`, {method: 'POST'})
  .then( function(response) {
    if (response.status !== 200)  return false;
      response.json().then(function(data) {
        document.querySelector('#input-led-0').value = data
      }
    );
  })
  .catch(err => false);
      
function lights_queryValue(arg){

  arg = arg.join('/')
  fetch(`${url}/0/admin/led/getValue/${arg}`, {method: 'POST'})
    .then( function(response) {
      if (response.status !== 200)  return false;
        response.json().then(function(data) {
          console.log(data)
        }
      );
    })
    .catch(err => false);
}

function setTarget(led, value){
	return `0-admin-led-setTarget-${led}-1-${value}`
}


izq = document.querySelector('#input-led-0')
izq.addEventListener('input', function () {
	sendCommand(setTarget(0, izq.value))
}, false);

der = document.querySelector('#input-led-1')
der.addEventListener('input', function () {
	sendCommand(setTarget(1, der.value))
})


customCommand = document.querySelector('#input-customCommand')
customCommand.addEventListener('change', function(){
	console.log(customCommand.value)
	sendCommand(customCommand.value)

})
