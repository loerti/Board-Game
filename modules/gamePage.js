import { activateButton, deactivateButton } from "./helper.js";
import { getItem } from "./storageModule.js";

function themePicked() {
  if (
    JSON.parse(localStorage.getItem("backgroundTheme")) ===
    "/images/background-island.png"
  ) {
    document.body.classList.add("bg-island");
  } else {
    document.body.classList.add("bg-jungle");
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  themePicked();
});

let pauseButton = document.getElementById('pauseMusic');
let playButton = document.getElementById('playMusic');

pauseButton.addEventListener('click', () => {
  document.getElementById('audio').pause();
  pauseButton.style.display = 'none';
  playButton.style.display = "block";

});

playButton.addEventListener('click', () => {
  document.getElementById('audio').play();
  playButton.style.display = 'none';
  pauseButton.style.display = "block";
});

let player1 = getItem('player1');
let player2 = getItem('player2');

document.getElementById("player1").innerHTML = `${player1.name}`;
document.getElementById("player2").innerHTML = `${player2.name}`;

document.getElementById("avatar1").src = player1.logo;
document.getElementById("avatar2").src = player2.logo;

deactivateButton('removeWinner', 'winnerModal');
activateButton('helpButton', 'instructions')
deactivateButton('removeInst', 'instructions');
activateButton('resatartButton', 'restart-window');
deactivateButton('removeRestart', 'restart-window');
activateButton('exitGame', 'exit-window');
deactivateButton('removeExit', 'exit-window');