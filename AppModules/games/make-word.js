const readline = require("readline");
const https = require("https");
const dictionary = require("../dictionary");

const variants = dictionary.words.variants;

function checkWordValidity(availableLetters, word) {
  const letters = Array.from(availableLetters);
  const lowercaseWord = word.toLowerCase();
  const lowercaseLetters = letters.map(letter => letter.toLowerCase());
  for (let i = 0; i < lowercaseWord.length; i++) {
    const letterIndex = lowercaseLetters.indexOf(lowercaseWord[i]);
    if (letterIndex !== -1) {
      lowercaseLetters.splice(letterIndex, 1);
    } else {
      return false;
    }
  }
  return true;
}

function checkWordInDictionary(word) {
  return new Promise(resolve => {
    const API_KEY = dictionary.words.dictionaryApiKey; // Замените на ваш API ключ
    const options = {
      hostname: "dictionary.yandex.net",
      path: encodeURI(
        `/api/v1/dicservice.json/lookup?key=${API_KEY}&lang=ru-ru&text=${word}`
      )
    };
    const url = `https://${options.hostname}${options.path}`;

    const request = https.request(url, response => {
      let data = "";
      response.on("data", chunk => {
        data += chunk.toString();
      });

      response.on("end", () => {
        const result = JSON.parse(data);
        resolve(result.def && result.def.length > 0);
      });
    });

    request.on("error", error => {
      console.error(dictionary.words.dictionaryError, error.message);
      resolve(false);
    });
    request.end();
  });
}

function MakeWordGame() {
  console.log(dictionary.words.welcome);
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
      prompt: ""
    });

    const randomIndex = Math.floor(Math.random() * variants.length);
    const availableLetters = variants[randomIndex].letters;

    console.log(`${dictionary.words.letters}\n${availableLetters}`);

    rl.question(dictionary.words.inputYourWord, async input => {
      try {
        const result = await checkWordInDictionary(input);
        console.log(`${dictionary.words.yourWord} ${input}`);
        console.log(
          `${dictionary.words.dogWord} ${variants[randomIndex].word}`
        );

        let win = false;
        if (result) {
          console.log(dictionary.words.isInDictionary);
          win = true;
        } else {
          console.log(dictionary.words.isNotInDictionary);
          win = false;
        }
        if (checkWordValidity(availableLetters, input)) {
          console.log(
            `"${input}" ${dictionary.words.couldBeFormed} "${availableLetters}"`
          );
          win = win && true;
        } else {
          console.log(`${dictionary.words.couldNotBeFormed} "${input}".`);
          win = false;
        }
        if (variants[randomIndex].word.length < input.length) {
          console.log(dictionary.words.win);
          win = win && true;
        } else if (variants[randomIndex].word.length === input.length) {
          console.log(dictionary.words.draw);
          win = "draw";
        } else {
          console.log(dictionary.words.lose);
          win = false;
        }
        resolve(win);
      } catch (error) {
        console.error(dictionary.words.someError, error);
        reject(error);
      }
    });
  });
}

module.exports = MakeWordGame;
