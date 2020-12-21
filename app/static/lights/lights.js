function refreshValue(strip, values){
  var values = JSON.parse(values)
  const leds = document.querySelectorAll(`input[data-strip='${strip}']`)
  for (var i = 0; i < values.length; i++) {
    leds[i].value = values[i]
  }
}

function refreshBrigth(strip, value){
  var value = JSON.parse(value)
  e = document.querySelector(`input[data-strip='${strip}'][data-led='br']`)
  if(e){
      e.value = value[0]
  }

}

function setTarget(dataset){
  var strip = dataset.strip
  const leds = document.querySelectorAll(`input[data-strip='${strip}']`)
  var values = []
  for (const led of leds) {
    if(led.dataset.led != 'br'){
      values.push(led.value)
    }
  }
  var n = values.length
  values = values.join('-')
  return `comm/0-admin-led-setTarget-${strip}-${n}-${values}`
}
function setBright(e){
  var strip = e.dataset.strip
  var value = e.value
  return `comm/0-admin-led-setBright-${strip}-${value}`
}
function setMS(dataset){
  var strip = dataset.strip
  return `comm/0-admin-led-setMS-${strip}`
}

function getValue(strip){
  var cmd = `comm/0-admin-led-getValue-${strip}`
  fetch(`${url}/${cmd}`, {method: 'POST'})
      .then( function(response) {
        if (response.status !== 200)  return false;
          response.text().then(function(data) {
            refreshValue(strip, data)
          }
        ).catch(err => console.log("ERROR"))
      })
    .catch(err => false);
} 
function getBright(strip){
  var cmd = `comm/0-admin-led-getBright-${strip}`
  fetch(`${url}/${cmd}`, {method: 'POST'})
      .then( function(response) {
        if (response.status !== 200)  return false;
          response.text().then(function(data) {
            refreshBrigth(strip, data)
          }
        ).catch(err => console.log(err))
      })
    .catch(err => false);
} 

function setColor(strip, color){
  var n = color.length
  var values = color.join('-')
  sendCommand(`comm/0-admin-led-setTarget-${strip}-${n}-${color}`)
  refreshValue(2, JSON.stringify(color))
}

for (const a of document.querySelectorAll("input[type='range']")){
  if(a.dataset.led != 'br'){
    a.addEventListener('input', function(e){
      sendCommand(setTarget(e.target.dataset))
    });
  }
}

for (const a of document.querySelectorAll("input[type='range'][data-led='br']")){
  a.addEventListener('input', function(e){
    sendCommand(setBright(e.target))
  });
}

for (const a of document.querySelectorAll(".div-rangeGroup")){
  getValue(a.dataset.strip)
  getBright(a.dataset.strip)
}

customCommand = document.querySelector('#input-customCommand')
customCommand.addEventListener('change', function(){
	console.log(customCommand.value)
})
