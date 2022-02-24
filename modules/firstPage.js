import { setItem } from "./storageModule.js";
import { toggleOff, toggleOn, checkAvatar } from "./helper.js"

window.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  let jungleBtn = document.getElementById("jungle");
  let islandBtn = document.getElementById("island");

  jungleBtn.addEventListener("click", () => {
    document.body.classList.remove("bg-island");
    document.body.classList.add("bg-jungle");
  });
  islandBtn.addEventListener("click", () => {
    document.body.classList.remove("bg-jungle");
    document.body.classList.add("bg-island");
  });

  let play = document.getElementById("startGameBtn");

  // Event listener for the start game button

  play.addEventListener("click", () => {

    let backgroundTheme = document.getElementsByName("theme");
    let theme;

    for (let i = 0; i < backgroundTheme.length; i++) {
      if (backgroundTheme[i].checked) {
        theme = "/images/background-" + backgroundTheme[i].value + ".png";
      }
    }
    window.localStorage.setItem('backgroundTheme', JSON.stringify(theme));

    let avatar1 = document.getElementsByName('avatar1');
    let avatar2 = document.getElementsByName('avatar2');

    /* Start creating select an image when creating players */

    if (checkAvatar(avatar1, avatar2) === true) {
      document.getElementById('alert').style.display = 'block';
    }
    /* The end of checking for the avatars */

    let player1Avatar;
    let player2Avatar;
    for (let i = 0; i < avatar1.length; i++) {
      if (avatar1[i].checked == true) {
        player1Avatar = "/images/avatars/" + avatar1[i].value + ".png";
      }
    }
    for (let i = 0; i < avatar2.length; i++) {
      if (avatar2[i].checked == true) {
        player2Avatar = "/images/avatars/" + avatar2[i].value + ".png";
      }
    }

    let name1 = document.getElementById('firstPlayer').value;
    let name2 = document.getElementById('secondPlayer').value;

    let player1 = { name: name1, logo: player1Avatar };
    let player2 = { name: name2, logo: player2Avatar };

    setItem('player1', player1);
    setItem('player2', player2);

    document.getElementById("initGame").addEventListener("submit", logSubmit);



  });

  let removeInst = document.getElementById('removeInst');
  removeInst.addEventListener('click', () => {
    toggleOff('instructions');
  });

  let helper = document.getElementById('helpButton');
  helper.addEventListener('click', () => {
    toggleOn('instructions');
  });

  let alert = document.getElementById('removeAlert');
  alert.addEventListener('click', () => {
    toggleOff('alert');
  });

  function logSubmit(event) {
    event.preventDefault();
    window.location = 'storyline.html';
  }


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

