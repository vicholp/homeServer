function refreshValue(strip, values){
  const leds = document.querySelectorAll(`input[data-strip='${strip}']`)
  let bc = []
  for (var i = 0; i < values.length; i++) {
    leds[i].value = values[i]
    bc.push((values[i]*255)/1023 + 0.05)
  }
  if (values.length === 3 ){
    document.querySelector(`#card-led-${strip}`).style.borderColor = `rgba(${bc.join(',')},0.3)`
  }
}

function refreshBrigth(strip, value){
  e = document.querySelector(`input[data-strip='${strip}'][data-led='br']`)
  if(e){
      e.value = value
      if (e.dataset.bc === "True"){
        document.querySelector(`#card-led-${strip}`).style.backgroundColor = `rgba(255,255,255,${(value*0.15)/1023 + 0.05})`
      }
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
  document.querySelector(`#card-led-${e.dataset.strip}`).style.borderColor = `rgba(${values.join(',')},0.3)`
  values = values.join('-')

  return `0-admin-led-setTarget-${strip}-${n}-${values}`
}

function setBright(e){
  var strip = e.dataset.strip
  var value = e.value
  if (e.dataset.bc === "True"){
    document.querySelector(`#card-led-${e.dataset.strip}`).style.backgroundColor = `rgba(255,255,255,${(value*0.15)/1023 + 0.05})`
  }

  return `0-admin-led-setBright-${strip}-${value}`
}


function setMS(dataset){
  var strip = dataset.strip
  return `0-admin-led-setMS-${strip}`
}


function getValue(strip){
  sendCommand(`0-admin-led-getValue-${strip}`)
    .then(data => refreshValue(strip, data.body))
}

function getBright(strip){
  sendCommand(`0-admin-led-getBright-${strip}`)
    .then(data => refreshBrigth(strip, data.body.bright))
}

function setColor(strip, color, bright){
  if (color != -1){
    var n = color.length
    var values = color.join('-')
    sendCommand(`0-admin-led-setTarget-${strip}-${n}-${values}`)
    refreshValue(strip, color)
  }
  if (bright != -1){
    sendCommand(`0-admin-led-setBright-${strip}-${bright}`)
    refreshBrigth(strip, bright)
  }

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
