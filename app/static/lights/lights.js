function refreshValue(strip, values){

  values = values.body
  const leds = document.querySelectorAll(`input[data-strip='${strip}']`)
  for (var i = 0; i < values.length; i++) {
    leds[i].value = values[i]
  }
}

function refreshBrigth(strip, value){
  values = values.body.bright
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
  return `0-admin-led-setTarget-${strip}-${n}-${values}`
}

function setBright(e){
  var strip = e.dataset.strip
  var value = e.value
  return `0-admin-led-setBright-${strip}-${value}`
}

function setMS(dataset){
  var strip = dataset.strip
  return `0-admin-led-setMS-${strip}`
}


function getValue(strip){
  sendCommand(`0-admin-led-getValue-${strip}`)
    .then(data => refreshValue(strip, data))



}
function getBright(strip){
  sendCommand(`0-admin-led-getBright-${strip}`)
    .then(data => refreshValue(strip, data))
}

function setColor(strip, color){
  var n = color.length
  var values = color.join('-')
  sendCommand(`0-admin-led-setTarget-${strip}-${n}-${color}`)
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
