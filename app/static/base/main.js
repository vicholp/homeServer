const url_arduino = "http://192.168.1.6"
const url_host = "http://192.168.1.5"
const beet_port = "9000"
const url_torrent = "http://192.168.1.8:8080"


function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}
