const dictionary = require("../dictionary");

const facts = dictionary.trueOrFalse.facts;

const attempts = 3;

function getRandomFact(facts) {
  const randomIndex = Math.floor(Math.random() * facts.length);
  return facts.splice(randomIndex, 1)[0];
}

function TrueOrFalse() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
    prompt: ""
  });
  console.log(dictionary.trueOrFalse.welcome);
  return new Promise(resolve => {
    let count = 0;
    let result = 0;
    function askQuestion() {
      if (count < attempts && facts.length > 0) {
        const factsForGame = [...facts];
        const fact = getRandomFact(factsForGame);
        readline.question(
          fact.fact + dictionary.trueOrFalse.question,
          userAnswer => {
            if (
              (userAnswer === "1" && fact.isTrue) ||
              (userAnswer === "2" && !fact.isTrue)
            ) {
              console.log(
                dictionary.trueOrFalse.correct + fact.response + "\n"
              );
              result += 1;
            } else {
              console.log(
                dictionary.trueOrFalse.incorrect + fact.response + "\n"
              );
            }
            count += 1;
            askQuestion();
          }
        );
      } else {
        console.log(
          `${dictionary.trueOrFalse.numberOfCorrect} ${result} из ${attempts}`
        );
        resolve(result > attempts / 2);
      }
    }
    askQuestion();
  });
}

module.exports = TrueOrFalse;
