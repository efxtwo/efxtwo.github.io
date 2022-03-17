console.log('working')

const stayButton = document.getElementById('stayButton');
const hitButton = document.getElementById('hitButton');
const startButton = document.getElementById('startButton');
const playersHold = document.getElementById('playersCards');
const dealersHold = document.getElementById('dealersCards');
const playerValue = document.getElementById('playerValue');
const dealerValue = document.getElementById('dealerValue');

let cardSuites = ['clubs','hearts','diamonds','spades'];
let cardNums = ['ace',2,3,4,5,6,7,8,9,10,'jack','queen','king'];
let deck = [];
let cardCount = 0;
let gameStatus = 0;


for(suit in cardSuites){
    for(nums in cardNums){
       let cardValue = nums > 9 ? 10 : parseInt(nums) + 1;

       let card = {
           suites: cardSuites[suit],
           number: cardNums[nums],
           value: cardValue
       };  
       deck.push(card);
    }
}
function shuffleDeck(array) {    //shuffling the deck, order of cards get re-arranged
    for (var i = array.length - 1; i > 0; i--){
          var j = Math.floor(Math.random() * (i + 1));  // getting random values
          var temp = array[i]; // a temporary holder to hold the value of i
          array[i] = array[j];  // re-creating the value of i by a random value
          array[j] = temp;
      }
      return array;
  }

function dealCards(){
    let playersHand =[];
    let dealersHand = [];
    let dealerCounter = 0;
    gameStatus = 1;
    playersHold.innerHTML = '';
    dealersHold.innerHTML = '';

    
    for(i=0; i<2; i++){
        playersHand.push(deck[cardCount]);
        playersHold.innerHTML += `<img src=PNG-cards/${deck[cardCount].number}_of_${deck[cardCount].suites}.png>`;
        // playerCounter = parseInt(playerCounter) + parseInt(`${deck[cardCount].value}`);
        cardCounter();
        dealersHand.push(deck[cardCount]);
        if (i == 0){
            dealersHold.innerHTML += `<img src=PNG-cards/pokemoncard.png>`;
        } else{
            dealersHold.innerHTML += `<img src=PNG-cards/${deck[cardCount].number}_of_${deck[cardCount].suites}.png>`;
            dealerValue.innerHTML = `${deck[cardCount].value}`;
        }
        cardCounter();
    }
    let playerCounter = aceCheck(playersHand);
    if (playerCounter == 21 && playersHand.length == 2){
        gameOver();
    }
    playerValue.innerHTML = playerCounter;
}

function cardCounter(){
    cardCount++;
    if (cardCount > 29){
        shuffleDeck(deck);
        cardCount = 0;
    }
}

function startGame(){
    shuffleDeck(deck);
    dealCards();
};

function aceCheck(whosCard){
    let checkValue = 0;
    let hasAce = false;

    for(let i in whosCard){
        if (whosCard[i].number == 'ace' && !hasAce){
            hasAce = true;
            checkValue = checkValue + 10;
        }
        checkValue = checkValue + whosCard[i].value;
    }

    if (hasAce && checkValue > 21){
        checkValue = checkValue - 10;
        }
       return checkValue; 
}

function gameOver(){
    dealersHold.innerHTML = `<img src=PNG-cards/${deck[1].number}_of_${deck[1].suites}.png><img src=PNG-cards/${deck[3].number}_of_${deck[3].suites}.png>`;
    dealerCounter = parseInt(deck[1].value) + parseInt(deck[3].value);
    dealerValue.innerHTML = dealerCounter;
}

startButton.addEventListener('click',startGame)