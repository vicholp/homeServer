fetch(`${url}/0/admin/led/getValue/1`, {method: 'POST'})
  .then( function(response) {
    if (response.status !== 200) return false
      response.json().then(function(data) {
        document.querySelector('#label-derecha').textContent = "Derecha - " + data
        document.querySelector('#input-derecha').value = data
      }
    );
  })
  .catch(err => false);

fetch(`${url}/0/admin/led/getValue/0`, {method: 'POST'})
  .then( function(response) {
    if (response.status !== 200)  return false;
      response.json().then(function(data) {
        document.querySelector('#label-izquierda').textContent = "Izquierda - " + data
        document.querySelector('#input-izquierda').value = data
      }
    );
  })
  .catch(err => false);
      

function setTarget(led, value){
	return `0/admin/led/setTarget/${led}/1/${value}`
}


izq = document.querySelector('#input-izquierda')
izq.addEventListener('input', function () {
	document.querySelector('#label-izquierda').textContent = "Izquierda - " + izq.value
	sendCommand(setTarget(0, izq.value))
}, false);

der = document.querySelector('#input-derecha')
der.addEventListener('input', function () {
	document.querySelector('#label-derecha').textContent = "Derecha - " + der.value
	sendCommand(setTarget(1, der.value))
})


customCommand = document.querySelector('#input-customCommand')
customCommand.addEventListener('change', function(){
	console.log(customCommand.value)
	sendCommand(customCommand.value)

})
