function beet_getItem(id){

  return beet_command(`item/${id}`)
}

function beet_getQuery(query){
  return beet_command(`item/query/${query}`)
}

function beet_getArtUrl(id){

  return `${url_host}:${beet_port}/album/${id}/art`
}

function beet_getFileUrl(id){

  return `${url_host}:${beet_port}/item/${id}/file`
}

function beet_command(arg){
  return fetch(`${url_host}:${beet_port}/${arg}`, {method: 'GET'})
    .then(response => response.json())
}
