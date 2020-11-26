function refreshValue(strip, values){
  var values = values.split(',')
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

function getValue(strip){
  return `comm/0-admin-led-getValues-${strip}`
} 

for (const a of document.querySelectorAll("input[type='range']")){
  a.addEventListener('input', function(e){
    sendCommand(setTarget(e.target.dataset))
  });
}

for (const a of document.querySelectorAll(".div-rangeGroup")){
  console.log(sendCommand(getValue(a.dataset.strip))) 
}

customCommand = document.querySelector('#input-customCommand')
customCommand.addEventListener('change', function(){
	console.log(customCommand.value)
})
