(function(){

  FRAME_WIDTH = 200
  FRAME_HEIGHT = 200
  ITEM_WIDTH = 20
  ITEM_HEIGHT = 20
  LENGTH = 10
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
      const val = Math.floor( Math.random() * (LENGTH*LENGTH-1 + 1 - 0) ) + 0
      if (mine_pos_list.includes(val)) {
        i--
        continue
      }
      mine_pos_list.push(val)
    }

    for (let i=0; i < LENGTH; i++) {
      const line = []
      for (let i=0; i < LENGTH; i++) {
        line.push(0)
      }
      map.push(line)
    }
    mine_pos_list.forEach(function (mine) {
      let _mine = mine.toString()
      const f = _mine.substr(0,1)
      const s = _mine.substr(1,1)
      let y = 0
      let x = 0
      if (_mine.length < 2) {
        x = f
      } else {
        y = f
        x = s
      }
      map[y][x] = "×"
    })
    return map
  }
  function open(map, { x, y }, el) {
    if (map[y][x] === '×') {
      alert("game over")
    }
    el.innerText = map[y][x]
  }

  function createMineMap (map) {
    let newMap = map.concat()
    newMap.map(function (line, i) {
      line.map(function(v, k) {
        let count = 0

        let arround = []

        if (i < 1) {
          arround.push(map[i+1][k])
          if (k === 0){
            arround = arround.concat([map[i][k+1],map[i+1][k+1]])
          } else if (k === LENGTH-1) {
            arround = arround.concat([map[i+1][k-1], map[i][k-1]])
          } else {
            arround = arround.concat([map[i][k+1], map[i+1][k+1], map[i+1][k-1], map[i][k-1]])
          }
        } else if (i === LENGTH-1) {
          arround.push(map[i-1][k])
          if (k === 0){
            arround = arround.concat([map[i-1][k+1], map[i][k+1]])
          } else if (k === LENGTH-1) {
            arround = arround.concat([map[i][k-1], map[i-1][k-1]])
          } else {
            arround = arround.concat([map[i-1][k+1],map[i][k+1],map[i][k-1],map[i-1][k-1]])
          }
        } else {
          arround = arround.concat([], map[i+1][k], map[i-1][k])
          if (k === 0){
            arround = arround.concat(map[i-1][k+1], map[i][k+1], map[i+1][k+1])
          } else if (k === LENGTH-1) {
            arround = arround.concat(map[i+1][k-1], map[i][k-1], map[i-1][k-1])
          } else {
            arround = arround.concat([map[i-1][k+1], map[i][k+1], map[i+1][k+1], map[i+1][k-1], map[i][k-1], map[i-1][k-1]])
          }
        }
        arround.forEach(function (res) {
          if (res === "×") count = count + 1
        })
        if (map[i][k] !== '×') map[i][k] = count
      })
    })
    return newMap
  }

  function createMapElement (parent, map) {
    map.forEach(function (line, y) {
      line.forEach(function (col, x) {
        const el = document.createElement('div')
        el.style.width = ITEM_WIDTH + 'px'
        el.style.height = ITEM_HEIGHT + 'px'
        el.style.float = 'left'
        el.innerText = col
        el.addEventListener('click', function () { open(map, { x, y }, el) })
        parent.appendChild(el)
      })
    })
  }

  window.onload = function () {
    const app = document.getElementById('app')
    createFrame(app)
    const base = createMap()
    const map = createMineMap(base)
    createMapElement(app, map)
  }
})()
