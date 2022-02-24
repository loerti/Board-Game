import {
  addToLog,
  rollMessage,
  positionMessage,
  setWinner,
  removeHighlightPlayersTurn,
  highlightPlayersTurn,
  goToBottom,
  messageAfterFallingOnTrap,
  messageAfterFallingOnBonus,
} from "./gameViewModule.js";

import { Game } from "./game.js";

import {
  takesItDown,
  calculatePosition,
  normalBoard,
  hardBoard,
} from "./boardModule.js";

import { positionOnBoard, removeFromBoard } from "./boardView.js";
import { getItem } from "./storageModule.js";

let gameLog = document.getElementById("gameLog");
let history = document.getElementById("gameHistory");
let gameInstance = new Game();
let theme = getItem("backgroundTheme");

function chooseBoard(theme) {
  if (theme === "/images/background-jungle.png") {
    return normalBoard;
  } else {
    return hardBoard;
  }
}

let board = chooseBoard(theme);

function isWinner(player) {
  let winnerFrame = document.getElementById("winnerModal");
  let paragraph = document.getElementById("gameWinner");
  let winnerImage = document.getElementById("winnerAvatar");
  if (player.getPosition() === 50) {
    setWinner(player, winnerFrame, paragraph, winnerImage);
    return true;
  } else if (player.getPosition() < 50) {
    return false;
  }
}

function doPositioning(player, otherPlayer, dice) {
  let oldPosition = player.getPosition();
  removeFromBoard(player);
  let newPosition = calculatePosition(board, oldPosition, dice);
  //If number is outside the board, example value 52 it will return NaN so the check is done for that.
  if (Number.isNaN(newPosition)) {
    player.setPosition(oldPosition);
    overlap(player, otherPlayer);
  } else {
    player.updatePosition(newPosition);

    //Will check if this new position is the same as the old one in which case it
    //means that we have a wildcard which returned zero and the player was blocked
    let tempPosition = player.getPosition();
    if (
      tempPosition === oldPosition + dice &&
      board[tempPosition - 1] === "wild"
    ) {
      addToLog(
        gameLog,
        `${player.name} got stuck inside a sandpit. He can't move in the next turn`
      );
      player.setPosition(oldPosition);
      player.setStatus(true);
    }
    //To fix the issue of log displaying the block message when player rolled for example (3 and fell on a -3 tile)
    else if (board[oldPosition + dice - 1] !== "wild") {
      if (board[oldPosition + dice - 1] < 0) {
        addToLog(gameLog, messageAfterFallingOnTrap(player));
      } else if (board[oldPosition + dice - 1] > 0) {
        addToLog(gameLog, messageAfterFallingOnBonus(player));
      }
    }
    overlap(player, otherPlayer);
  }

  //If it is not the winner do the positioning on board directly.
  if (!isWinner(player, oldPosition)) {
    positionOnBoard(player);
    //Condition to check if 6 was rolled, because turn is not changed.
    if (dice !== 6) {
      changeTurns();
    }
  }
}

function overlap(player, otherPlayer) {
  if (takesItDown(player.getPosition(), otherPlayer.getPosition())) {
    doTakeDown(otherPlayer);
  }
}

function doTakeDown(otherPlayer) {
  removeFromBoard(otherPlayer);
  otherPlayer.setPosition(0);
  positionOnBoard(otherPlayer);
}

function isAtStart(player) {
  if (player.getPosition() === 0) {
    return true;
  }
}

function changeTurns() {
  gameInstance.setTurnPlayer1();
  gameInstance.setTurnPlayer2();
  //Highlight is done during turn changing
  if (gameInstance.getTurnPlayer1()) {
    removeHighlightPlayersTurn(2);
    highlightPlayersTurn(1);
  } else if (gameInstance.getTurnPlayer2()) {
    removeHighlightPlayersTurn(1);
    highlightPlayersTurn(2);
  }
}

function rolledSix(player, otherPlayer) {
  doPositioning(player, otherPlayer, 1);
}

function checkDiceAtStart(player, otherPlayer, dice) {
  if (dice === 6) {
    addToLog(gameLog, rollMessage(player, dice));
    rolledSix(player, otherPlayer, dice);
  } else {
    addToLog(gameLog, rollMessage(player, dice));
    changeTurns();
  }
}

function doPlayerTurnMovements(player, otherPlayer, dice) {
  addToLog(gameLog, rollMessage(player, dice));
  doPositioning(player, otherPlayer, dice);
}

function doMovements(player, otherPlayer, dice) {
  doPlayerTurnMovements(player, otherPlayer, dice);
  addToLog(gameLog, positionMessage(player));
}

function playTurn(player, otherPlayer, dice) {
  if (isAtStart(player)) {
    checkDiceAtStart(player, otherPlayer, dice);
  } else {
    //Checking if player is blocked before starting turn
    //If true -> change value of isBlocked and change the turn
    if (player.getStatus()) {
      player.setStatus(false);
      changeTurns();
    } else {
      doMovements(player, otherPlayer, dice);
    }
  }
}

function playGame(player1, player2, dice) {
  if (gameInstance.getTurnPlayer1()) {
    playTurn(player1, player2, dice);
  } else if (gameInstance.getTurnPlayer2()) {
    playTurn(player2, player1, dice);
  }
  goToBottom(history);
}

export { playGame, board };
