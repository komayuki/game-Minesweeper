(function(){

  FRAME_WIDTH = 200
  FRAME_HEIGHT = 200
  ITEM_WIDTH = 20
  ITEM_HEIGHT = 20
  LENGTH = 100
  MINE_NUMBER = 10

  function createFrame (dom) {
    dom.style.width = FRAME_WIDTH + "px"
    dom.style.height = FRAME_HEIGHT + "px"
    dom.style.backgroundColor = "#efefef"
  }

  function createMap () {
    let map = []
    let mine_pos_list = []
    for (let i = 0; i < MINE_NUMBER; i++) {
      const val = Math.floor( Math.random() * (LENGTH-1 + 1 - 0) ) + 0
      if (mine_pos_list.includes(val)) {
        i--
        continue
      }
      mine_pos_list.push(val)
    }
    for (let i=0; i < LENGTH; i++) {
      if (mine_pos_list.includes(i)) {
        map.push(1)
      } else {
        map.push(0)
      }
    }
    console.dir(map)
    return map
  }

  function setMap (parent, map) {
    map.forEach(function (item, index) {
      const el = document.createElement('div')
      const pos = [
        map[index-10],
        map[index-9],
        map[index+1],
        map[index+11],
        map[index+10],
        map[index+9],
        map[index-1],
        map[index-11]
      ]
      let count = 0
      pos.forEach (function (p) {
        if (p > 0) count++
      })

      el.style.width = ITEM_WIDTH + 'px'
      el.style.height = ITEM_HEIGHT + 'px'
      el.style.float = "left"
      el.innerText = count
      parent.appendChild(el)
    })
  }

  window.onload = function () {
    const app = document.getElementById('app')
    createFrame(app)
    const map = createMap()
    setMap(app, map)
    console.dir(app)
  }
})()
