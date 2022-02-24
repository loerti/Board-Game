import { wildcardHandling } from './wildcardHandler.js';

const normalBoard = [
  //Board with the normal difficulty
  0,
  0,
  0,
  "wild",
  0,
  0,
  0,
  2,
  0,
  0,
  0,
  -3,
  0,
  0,
  0,
  "wild",
  0,
  0,
  0,
  0,
  -1,
  0,
  0,
  4,
  0,
  0,
  0,
  0,
  -3,
  0,
  0,
  0,
  1,
  0,
  0,
  -1,
  0,
  0,
  2,
  0,
  0,
  "wild",
  0,
  0,
  -2,
  0,
  "wild",
  0,
  0,
  0,
];

const hardBoard = [
  //Board with the hard difficulty
  0,
  0,
  0,
  "wild",
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  -3,
  0,
  0,
  0,
  "wild",
  0,
  -3,
  0,
  0,
  -1,
  0,
  0,
  2,
  0,
  0,
  0,
  0,
  -3,
  0,
  0,
  -2,
  0,
  0,
  0,
  -1,
  0,
  0,
  1,
  0,
  0,
  "wild",
  0,
  0,
  -1,
  0,
  "wild",
  0,
  -3,
  0,
];


/*
Function that will calculate the position where the player will be placed
*/
function calculatePosition(board, currentPosition, diceRoll) {
  let positionBoard = currentPosition - 1 + diceRoll;
  let value = 0;
  if (board[positionBoard] === "wild") {
    value = diceRoll + wildcardHandling();
  } else {
    value = board[positionBoard] + diceRoll;
  }
  return value;
}

//Function will hold the logic
//Nr Blocked will be passed through GameController instance

function takesItDown(incomingPlayerPosition, otherPlayerPosition) {
  if (incomingPlayerPosition === otherPlayerPosition) {
    return true;
  }
}

export {
  normalBoard,
  hardBoard,
  takesItDown,
  calculatePosition,
};
