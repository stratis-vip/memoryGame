let counter = 1 
let remaining = 8
let current = []
let solution = []
let tiles = []
let openedTiles = []
let moves = 0
let chrono = null

const nbsp = String.fromCharCode(160)

function updateTimeScore(){
  document.getElementById('timer').innerHTML = `Χρόνος που πέρασε: ${toTime(counter)}`
  document.getElementById('moves').innerHTML = `Κινήσεις: ${moves}`
}

function startChronometer(){
  chrono = setInterval(_ =>{
    updateTimeScore()
    counter +=1}, 1000)
}

function resetCounter(){
  counter = 1
}

function toTime(val){
  let hours = Math.floor(val / 3600)
  let mins = Math.floor((val - (hours * 3600)) / 60 )
  let secs = val - hours * 3600 - mins * 60
  let result = ''
  result += hours < 10 ? `0${hours}:`: `${hours}:`
  result += mins < 10 ? `0${mins}:`:`${hours}:`
  result += secs < 10 ? `0${secs}`:`${secs}`
  return result
}

function randomize(array){
  //from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  let local = array
  var currentIndex = local.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = local[currentIndex];
    local[currentIndex] = local[randomIndex];
    local[randomIndex] = temporaryValue;
  }

  return local;
}

function checkStatus(val){
  if (val === 0){
    setTimeout(_=>{
    window.alert(`Ολοκληρώθηκε σε ${moves} κινήσεςι σε χρόνο: ${toTime(counter)}`)
    restartGame()
    },0)
  }
}

function restartGame(){
  if (chrono) clearInterval(chrono)
  solution = current = randomize([0,1,1,2,2,3,3,4,4])
  counter = 0
  remaining = 8
  moves = 0
  updateTimeScore()
  const mPanel = document.getElementById("mainPanel")
  mPanel.innerHTML = ''
  createPanel(mPanel, current)
  startChronometer()
}

function openTile(tile){
  openedTiles.push(tile)
  tile.classList.add('opened')
  if (openedTiles.length ===2 ){
    moves +=1
    updateTimeScore()
    if (openedTiles[0].id === openedTiles[1].id){
      let t = findTileIndex(openedTiles[0])
      t.map(v => {
        solution[v]=-1
        tiles[v].onclick = null
      })
      openedTiles = []
      remaining -= 2
      checkStatus(remaining)
    } else { 
      setTimeout(_ => {
        openedTiles.map(tile => {
          tile.classList.remove('opened')
          tile.innerText = nbsp
        }) 
        openedTiles = []}, 500)
    }
  }
}

function findTileIndex(tile){
  let ret = []
  for (let i=0; i !== tiles.length; i++)
    if (tile.id === tiles[i].id) ret.push(i)
  return ret
}

function createPanel(obj, array){
  console.log('createPanel'+obj)
  for (let i=0; i!=9;i++){
    let el = document.createElement('div')
    el.id = array[i]
    el.classList.add('tile')
    el.onclick = (event) => {
      let text = parseInt(event.target.id) === 0 ? nbsp : event.target.id
      event.target.innerText = text
      openTile(event.target)
      console.log(event.target)
      console.log(openedTiles)
    }
    el.innerText = nbsp
    tiles[i] = el
    obj.appendChild(el)
  }
}

document.addEventListener('DOMContentLoaded', (event)=>{
  restartGame()
  })
