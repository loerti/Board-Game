//Used to generate the 50 tiles for the board each with a unique id corresponding to position.
function setTile(row, tile, index) {
  tile.setAttribute("id", index);
  tile.setAttribute("class", "tile");
  tile.append(index);
  row.appendChild(tile);
}

function createDiv(){
  return document.createElement("div")
}

// function getRowElement(index){
//   return document.getElementById(`row${index}`)
// }

function createTheRow(row, index1, index2){
  for (let index = index1; index <= index2; index++) {
    let tile = createDiv();
    setTile(row, tile, index);
  }
}

// function createRowElements(){
//   let rows = [row1, row2, row3, row4, row5, row6, row7, row8, row9];
//   for (let index = 0; index <= 8; index++) {
//     rows[index] = getRowElement(index+1);
//   }
// }

function generateTiles() {

  createTheRow(row1, 1, 9);

  let tile10 = createDiv();
  setTile(row2, tile10, 10);

  createTheRow(row3, 11, 19);

  let tile20 = createDiv();
  setTile(row4, tile20, 20);

  createTheRow(row5, 21, 29);

  let tile30 = createDiv();
  setTile(row6, tile30, 30);

  createTheRow(row7, 31, 39);

  let tile40 = createDiv();
  setTile(row8, tile40, 40);

  createTheRow(row9, 41, 50);
}

function removeFromBoard(player) {
  let oldPosition = document.getElementById(`${player.position}`);
  oldPosition.removeAttribute("style");
}

function positionOnBoard(player) {
  let newPosition = document.getElementById(`${player.position}`);
  newPosition.style.cssText = `background-image: url('${player.logo}'); background-size: contain; background-color: moccasin; background-repeat: no-repeat; background-position: center;	`;
  //Re-check if player logo is stored as a string directly at localStorage ...
}

function addTraps(board) {
  for (let i = 1; i <= board.length; i++) {
    let tile = document.getElementById(i);

    if (board[i - 1] === "wild") {
      tile.style.cssText = `background-image: url('/images/tiles/tilewild.jpg')`;
    } else if (board[i - 1] !== 0) {
      tile.style.cssText = `background-image: url('/images/tiles/tile${
        board[i - 1]
      }.jpg')`;
    }
  }

  document.getElementById(
    "50"
  ).style.cssText = `background-image: url('/images/tiles/tilewinner.jpg')`;
}

export { generateTiles, removeFromBoard, positionOnBoard, addTraps };
