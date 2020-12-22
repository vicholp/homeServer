customKey = document.querySelector('#input-customKey')
      customKey.addEventListener('input', function(){
        console.log(customKey.value)
        sendCommand("1/keyboard/click/" + customKey.value)
        customKey.value = ""

})

function sendKey(type, key){
	return `1/keyboard/${type}/${arg}`
}
function key(arg, type="click"){
    window.navigator.vibrate(30)
    sendCommand(sendKey(type, arg))
}