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
    playersHold.innerHTML = '';
    dealersHold.innerHTML = '';

    
    for(i=0; i<2; i++){
        playersHand.push(card[cardCount]);
        playersHold.innerHTML = `<img src=PNG-cards/${number}_of_${suits}.png>`;
        cardCounter();
        dealersHand.push(card[cardCount]);
        if (i == 0){
            dealersHold.innerHTML = `<img src=PNG-cards/pokemoncard.png>`;
        } else{
            dealersHold.innerHTML = `<img src=PNG-cards/${number}_of_${suits}.png>`;
            dealerValue.innerHTML = `${value}`
        }
    }
}

function cardCounter(){
    cardCount++;
    if (cardCount > 29){
        shuffleDeck(card);
        cardCount = 0;
    }
}