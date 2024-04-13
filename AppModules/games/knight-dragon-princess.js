const dictionary = require("../dictionary");

const options = dictionary.knightDragonAndPrincess.roles;

function computerPlay() {
  return options[Math.floor(Math.random() * options.length)];
}

function play(playerSelection) {
  let win = null;
  playerSelection = playerSelection.trim();
  switch (playerSelection) {
    case "1":
      playerSelection = options[0];
      break;
    case "2":
      playerSelection = options[1];
      break;
    case "3":
      playerSelection = options[2];
      break;
    default:
      console.log(dictionary.knightDragonAndPrincess.wrongInput);
  }
  const computerSelection = computerPlay();
  console.log(
    `${dictionary.knightDragonAndPrincess.yorChoice} ${playerSelection}`
  );
  console.log(
    `${dictionary.knightDragonAndPrincess.computerChoice} ${computerSelection}`
  );
  if (playerSelection === computerSelection) {
    console.log(dictionary.knightDragonAndPrincess.draw);
    win = "draw";
  } else if (
    playerSelection === options[0] &&
    computerSelection === options[1]
  ) {
    console.log(dictionary.knightDragonAndPrincess.knightAndDragon);
    win = true;
  } else if (
    playerSelection === options[1] &&
    computerSelection === options[2]
  ) {
    console.log(dictionary.knightDragonAndPrincess.dragonAndPrincess);
    win = true;
  } else if (
    playerSelection === options[2] &&
    computerSelection === options[0]
  ) {
    console.log(dictionary.knightDragonAndPrincess.princessAndKnight);
    win = true;
  } else if (
    playerSelection === options[1] &&
    computerSelection === options[0]
  ) {
    console.log(dictionary.knightDragonAndPrincess.dragonAndKnight);
    win = false;
  } else if (
    playerSelection === options[2] &&
    computerSelection === options[1]
  ) {
    console.log(dictionary.knightDragonAndPrincess.princessAndDragon);
    win = false;
  } else if (
    playerSelection === options[0] &&
    computerSelection === options[2]
  ) {
    console.log(dictionary.knightDragonAndPrincess.knightAndPrincess);
    win = false;
  } else {
    console.log(dictionary.knightDragonAndPrincess.wrongInput);
  }
  return win;
}

const KnightDragonAndPrincessGame = () => {
  console.log(dictionary.knightDragonAndPrincess.welcome);
  return new Promise(resolve => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
      prompt: ""
    });
    readline.question(dictionary.knightDragonAndPrincess.question, answer => {
      const result = play(answer);
      resolve(result);
    });
  });
};

module.exports = KnightDragonAndPrincessGame;
