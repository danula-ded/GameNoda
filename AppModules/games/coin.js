const dictionary = require("../dictionary");

function dropCoin() {
  console.log(dictionary.coin.welcome);
  return new Promise(resolve => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
      prompt: ""
    });
    const randomIndex = Math.floor(Math.random() * 2);
    readline.question(dictionary.coin.question, answer => {
      const result = parseInt(answer) === randomIndex + 1;
      if (result) {
        console.log(dictionary.coin.win);
      } else {
        console.log(
          `${dictionary.coin.lose} ${["орёл", "решка"][randomIndex]}`
        );
      }
      resolve(result);
    });
  });
}

module.exports = dropCoin;
