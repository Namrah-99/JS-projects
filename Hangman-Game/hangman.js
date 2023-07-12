// Word selection
const word = [
  ["Hangman", "That game you are playing right now."],
  ["Thomas Hj", "About the creator of this game."],
  ["HTML", "Markup language for creating Web pages."],
  ["CSS", "Web page styles"],
  ["PHP", "A very popular server scripting language."],
  ["JavaScript", "Make web-page dynamic without reloading the web page."],
  [
    "Java",
    "Runs on 15 billion devices.\nA program can be run in Windows, Linux, and Mac.",
  ],
  ["SoloLearn", "A company where everyone can code for fun and share."],
  ["Love", "What is love?\nBaby, don't hurt me\nDon't hurt me\nNo more."],
  ["Document", "A lot of text in a file."],
  ["Playground", "Where school kids go to have fun."],
  ["Run", "Usain Bolt."],
  ["Code", "var hw = 'Hello World';"],
  [
    "Samsung",
    "A company that creates phones, TVs, monitors, SSDs, memory chips, etc.",
  ],
  ["Super Mario", "A very popular game in Nintendo 64 that has a red hat."],
  ["Star", "Something Super Mario likes to get."],
  ["Clock", "14:12 or 14 pm."],
  ["Binary Clock", "A clock that only uses 0 or 1."],
  ["Sword", "A weapon that Link from Zelda wields in his hand."],
  ["Girl", "The opposite gender of boy."],
  ["Boy", "The opposite gender of girl."],
  ["Female", "Another term for a girl."],
  ["Male", "Another term for a boy."],
  ["Smartphone", "Something you always have with you."],
];

// Game keyboard
const keyboardAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Game memory
let select = 0;
let wordLeft = [];
let fail = 0;

// Web-page onload
window.addEventListener("load", () => {
  const moveKeyboard = gId("moveKeyboard");
  moveKeyboard.addEventListener("touchmove", (e) => {
    const wH = window.innerHeight;
    const tY = e.touches[0].clientY;
    const eL = gId("keyboardAlphabets");
    let resY = wH - tY - eL.offsetHeight;
    resY = resY < 0 ? 0 : resY > wH / 2 ? wH / 2 : resY;
    eL.style.bottom = resY + "px";
  });

  createKeyboard();
});

// Start game
function startGame() {
  const home = gId("home");
  const result = gId("result");
  home.classList.add("h");
  result.classList.add("h");
  newGame();
}

// New game
function newGame() {
  clearKeyboard();
  clearPlayer();
  createWord();
}

// Clear keyboard
function clearKeyboard() {
  const buttons = document.getElementsByClassName("b");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute("data", "");
  }
}

// Clear player
function clearPlayer() {
  fail = 0;
  wordLeft = [];
  gId("g0").setAttribute("data", "false");
  gId("g1").setAttribute("data", "false");
  gId("g2").setAttribute("data", "false");
  gId("g3").setAttribute("data", "false");
  gId("g4").setAttribute("data", "false");
  gId("g5").setAttribute("data", "false");
  gId("g5").setAttribute("r", "false");
  gId("g5").setAttribute("l", "false");
  gId("g6").setAttribute("data", "false");
  gId("g6").setAttribute("l", "false");
  gId("g6").setAttribute("r", "false");
  gId("hintButton").setAttribute("data", "false");
  gId("hint").style.display = "none";
}

// Get new word
function createWord() {
  const letterContainer = gId("letter");
  letterContainer.innerHTML = "";
  select = Math.floor(Math.random() * word.length);
  const selectedWord = word[select][0];
  for (let i = 0; i < selectedWord.length; i++) {
    const currentChar = selectedWord[i].toUpperCase();
    const placeholder = document.createElement("span");
    placeholder.className = `l${currentChar === " " ? " ls" : ""}`;
    placeholder.innerHTML = "&nbsp";
    placeholder.id = `l${i}`;
    letterContainer.appendChild(placeholder);

    if (currentChar !== " " && !wordLeft.includes(currentChar)) {
      wordLeft.push(currentChar);
    }
  }
}

// Create keyboard
function createKeyboard() {
  const keyboard = gId("keyboard");
  keyboard.innerHTML = "";
  for (let i = 0; i < keyboardAlphabets.length; i++) {
    const button = document.createElement("span");
    button.className = "b";
    button.innerText = keyboardAlphabets[i];
    button.setAttribute("data", "");
    button.addEventListener("click", function () {
      bTas(this);
    });
    keyboard.appendChild(button);
  }
}

// Game check, If show next error / game end
function bTas(button) {
  if (button.getAttribute("data") === "") {
    const letter = button.innerText;
    const isLetterExist = isExist(letter);
    button.setAttribute("data", isLetterExist);
    if (isLetterExist) {
      if (wordLeft.length === 0) {
        gameEnd(true);
      }
    } else {
      showNextFail();
    }
  }
}

// If letter "X" exists
function isExist(letter) {
  const upperCaseLetter = letter.toUpperCase();
  const letterIndex = wordLeft.indexOf(upperCaseLetter);
  if (letterIndex !== -1) {
    wordLeft.splice(letterIndex, 1);
    typeWord(upperCaseLetter);
    return true;
  }
  return false;
}

// Show next fail drawing
function showNextFail() {
  fail++;
  switch (fail) {
    case 1:
      gId("g0").setAttribute("data", "true");
      break;
    case 2:
      gId("g1").setAttribute("data", "true");
      break;
    case 3:
      gId("g2").setAttribute("data", "true");
      break;
    case 4:
      gId("g3").setAttribute("data", "true");
      gId("hintButton").setAttribute("data", "true");
      break;
    case 5:
      gId("g4").setAttribute("data", "true");
      break;
    case 6:
      gId("g5").setAttribute("data", "true");
      break;
    case 7:
      gId("g5").setAttribute("l", "true");
      break;
    case 8:
      gId("g5").setAttribute("r", "true");
      break;
    case 9:
      gId("g6").setAttribute("data", "true");
      gId("g6").setAttribute("l", "true");
      break;
    case 10:
      gId("g6").setAttribute("r", "true");
      gameEnd(false);
      break;
  }
}

function typeWord(letter) {
  const selectedWord = word[select][0];
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i].toUpperCase() === letter) {
      gId(`l${i}`).innerText = letter;
    }
  }
}

// Game result
function gameEnd(isWin) {
  const result = gId("result");
  result.setAttribute("data", isWin);
  const resultTitle = gId("rT");
  const resultMessage = gId("rM");
  if (isWin) {
    resultTitle.innerText = "You Win!";
    resultMessage.innerHTML =
      "Congratulations, you found the word!<br/><br/>Good Job!";
  } else {
    resultTitle.innerText = "You Lose!";
    resultMessage.innerHTML = `The word was <br/><br/>"${word[
      select
    ][0].toUpperCase()}"<br/><br/>Better luck next time.`;
  }
  result.className = "";
}

// Show hint
function hint() {
  gId("hintText").innerText = word[select][1];
  gId("hint").style.display = "block";
}

// Exit hint
function hintExit() {
  gId("hint").style.display = "none";
}

// Get HTML element by ID
function gId(id) {
  return document.getElementById(id);
}
