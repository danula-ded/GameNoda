const readline = require("readline");
const dictionary = require("../dictionary");

function createDeck() {
  const suits = dictionary.blackjack.suits;
  const values = dictionary.blackjack.values;
  const deck = [];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }

  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function calculatePoints(hand) {
  let points = 0;
  let aceCount = 0;

  for (let card of hand) {
    if (card.value === dictionary.blackjack.values[12]) {
      aceCount++;
      points += 11;
    } else if (
      card.value === dictionary.blackjack.values[9] ||
      card.value === dictionary.blackjack.values[10] ||
      dictionary.blackjack.values[11]
    ) {
      points += 10;
    } else {
      points += parseInt(card.value);
    }
  }

  while (points > 21 && aceCount > 0) {
    points -= 10;
    aceCount--;
  }

  return points;
}

function playBlackjack() {
  console.log(dictionary.blackjack.welcome);
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
      prompt: ""
    });

    const deck = createDeck();
    shuffleDeck(deck);

    const playerHand = [deck.pop(), deck.pop()];
    const dealerHand = [deck.pop(), deck.pop()];

    console.log(
      dictionary.blackjack.yourHand,
      playerHand[0].value + " " + playerHand[0].suit,
      "и",
      playerHand[1].value + " " + playerHand[1].suit
    );
    console.log(
      dictionary.blackjack.dogHand,
      dealerHand[0].value + " " + dealerHand[0].suit,
      dictionary.blackjack.oneMoreHidden
    );

    let playerPoints = calculatePoints(playerHand);
    let dealerPoints = calculatePoints(dealerHand);

    function askPlayer() {
      return new Promise(resolve => {
        if (playerPoints < 21) {
          rl.question(dictionary.blackjack.takeCard, answer => {
            if (answer.trim().toLowerCase() === "1") {
              const newCard = deck.pop();
              playerHand.push(newCard);
              console.log(
                dictionary.blackjack.dogHand,
                newCard.value + " " + newCard.suit
              );
              playerPoints = calculatePoints(playerHand);
              console.log(dictionary.blackjack.yourPoints, playerPoints);
              resolve(askPlayer());
            } else {
              console.log(dictionary.blackjack.yourPoints, playerPoints);
              resolve(dealerTurn());
            }
          });
        } else {
          console.log(dictionary.blackjack.yourPoints, playerPoints);
          resolve(dealerTurn());
        }
      });
    }

    function dealerTurn() {
      return new Promise(resolve => {
        console.log(
          dictionary.blackjack.dogShows,
          dealerHand[1].value + " " + dealerHand[1].suit
        );

        while (dealerPoints < 17) {
          const newCard = deck.pop();
          dealerHand.push(newCard);
          dealerPoints = calculatePoints(dealerHand);
          console.log(
            dictionary.blackjack.dogGets,
            newCard.value + " " + newCard.suit
          );
        }

        console.log(dictionary.blackjack.dogPoints, dealerPoints);

        if (playerPoints > 21) {
          console.log(dictionary.blackjack.overflow);
          resolve(false);
        } else if (dealerPoints > 21 || playerPoints > dealerPoints) {
          console.log(dictionary.blackjack.win);
          resolve(true);
        } else if (playerPoints < dealerPoints) {
          console.log(dictionary.blackjack.lose);
          resolve(false);
        } else {
          console.log(dictionary.blackjack.draw);
          resolve("draw");
        }
      });
    }

    askPlayer()
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = playBlackjack;
