const dictionary = require("../dictionary");

function PoleChudesGame() {
  console.log(dictionary.poleChudes.welcome);
  return new Promise(resolve => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
      prompt: ""
    });

    const variants = dictionary.poleChudes.variants;

    const randomIndex = Math.floor(Math.random() * variants.length);

    readline.question(variants[randomIndex].question, answer => {
      if (
        answer.trim().toLowerCase() ===
        variants[randomIndex].answer.toLowerCase()
      ) {
        console.log(dictionary.poleChudes.win);
        resolve(true);
      } else {
        console.log(
          `${dictionary.poleChudes.lose} ${variants[randomIndex].answer}`
        );
        resolve(false);
      }
    });
  });
}

module.exports = PoleChudesGame;
