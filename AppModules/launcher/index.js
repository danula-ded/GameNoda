// Игровой лаунчер
const games = require("../games");
const dictionary = require("../dictionary");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
  prompt: ">",
});

const gamesArray = [
  { id: "1", game: games.knightDragonAndPrincessGame },
  { id: "2", game: games.poleChudesGame },
  { id: "3", game: games.makeWordGame },
  { id: "4", game: games.blackJackGame },
  { id: "5", game: games.trueOrFalseGame },
  { id: "6", game: games.dropCoin },
];

async function startGame(gameId) {
  const selectedGame = gamesArray.find((game) => game.id === gameId);
  if (selectedGame) {
    const result = await selectedGame.game();
    countResult(result);
    afterGame(gameId);
  } else {
    console.log(dictionary.global.wrongInput);
    startLauncher();
  }
}

function countResult(gameResult) {
  if (gameResult === "draw") {
    console.log(dictionary.global.draw);
  } else {
    console.log(gameResult ? dictionary.global.win : dictionary.global.lose);
  }
}

function stopLauncher() {
  console.log(dictionary.global.goodbye);
  readline.close();
}

function startLauncher() {
  readline.question(dictionary.global.chooseGame, (answer) => {
    if (answer === "7") {
      stopLauncher();
    } else {
      startGame(answer);
    }
  });
}

function afterGame(gameToRepeatId) {
  readline.question(dictionary.global.playAgain, (answer) => {
    if (answer === "1") {
      startGame(gameToRepeatId);
    }
    if (answer === "2") {
      startLauncher();
    }
    if (answer === "3") {
      stopLauncher();
    }
  });
}

module.exports = { run: startLauncher };