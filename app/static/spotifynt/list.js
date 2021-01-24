function list_store(list, songs){
  let items = []
  for (song of songs){
    items.push(song.id)
  }
  sessionStorage.setItem('list-'+list, JSON.stringify(items))
}

function list_clear(list){
  sessionStorage.setItem('list-'+list, JSON.stringify([]))
}

function list_append(list, songs){
  items = JSON.parse(sessionStorage.getItem('list-'+list))
  items = items.concat(songs)
  sessionStorage.setItem('list-'+list, JSON.stringify(items))
}

function list_merge(lista, listb){
  itemsa = JSON.parse(sessionStorage.getItem('list-'+lista))
  itemsb = JSON.parse(sessionStorage.getItem('list-'+listb))
  itemsa = itemsa.concat(itemsb)
  sessionStorage.setItem('list-'+lista, JSON.stringify(itemsa))
}

function list_shuffle(list){
  items = JSON.parse(sessionStorage.getItem('list-'+list))
  items = shuffle(items)
  sessionStorage.setItem('list-'+list, JSON.stringify(items))
}

