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
let initialGame = true;
let cardCount = 0;
let gameStatus = 0;
let dealerUp = 0;
let dealerHidden = 0;
let playersHand =[];
let dealersHand = [];

function createDeck(){
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
    let playersDealtHand =[];
    let dealersDealtHand = [];
    let dealerCounter = 0;
	let dealersUpValue = 0;
    gameStatus = 1;
    playersHold.innerHTML = '';
    dealersHold.innerHTML = '';
    if(initialGame){
		createDeck();
		shuffleDeck(deck);
		cardCount = 0;
		initialGame = false;
	}
    
    for(i=0; i<2; i++){
        playersDealtHand.push(deck[cardCount]);
        playersHold.innerHTML += `<img src=PNG-cards/${deck[cardCount].number}_of_${deck[cardCount].suites}.png>`;
        // playerCounter = parseInt(playerCounter) + parseInt(`${deck[cardCount].value}`);
        cardCount++;
        dealersDealtHand.push(deck[cardCount]);
        if (i == 0){
            dealersHold.innerHTML += `<img src=PNG-cards/pokemoncard.png>`;
            dealerHidden = cardCount;
        } else{
            dealersHold.innerHTML += `<img src=PNG-cards/${deck[cardCount].number}_of_${deck[cardCount].suites}.png>`;
            dealersUpValue = parseInt(dealersUpValue)+parseInt(`${deck[cardCount].value}`);
            dealerUp = cardCount;
        }
        cardCount++;
    }
    let playerCounter = aceCheck(playersDealtHand);
    dealerCounter = aceCheck(dealersDealtHand);
    if ((playerCounter == 21 && playersDealtHand.length == 2) || (dealerCounter == 21 && dealersDealtHand.length == 2)){
        dealerCounter = dealerCounter;
        gameOver();
    } else {
		playerValue.innerHTML = playerCounter;
		if(dealersUpValue == 1){
			dealerValue.innerHTML = '1 or 11';
		} else {
			dealerValue.innerHTML = dealersUpValue;
		}
	}
    cardCounter();
    playersHand = playersDealtHand;
    dealersHand = dealersDealtHand;
}

function cardCounter(){
    if (cardCount > 29){
        initialGame = true;
    }
}

function startGame(){
    // shuffleDeck(deck);
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
    dealerCount = aceCheck(dealersHand);
    playerCount = aceCheck(playersHand);
    gameStatus = 0;
    dealersHold.innerHTML = `<img src=PNG-cards/${deck[dealerHidden].number}_of_${deck[dealerHidden].suites}.png><img src=PNG-cards/${deck[dealerUp].number}_of_${deck[dealerUp].suites}.png>`;
    dealerValue.innerHTML = dealerCount;
    playerValue.innerHTML = playerCount;

    if(playerCount > 22){
        console.log('LOSER! Player Bust');
    } else if(dealerCount > 22 && playerCount < 22){
        console.log('WINNER! Dealer Bust');
    } else if(dealerCount == 21 && dealersHand.length == 2 && playerCount != 21){
        console.log('LOSER! Dealer has BlackJack');
    } else if(playerCount == 21 && playersHand.length == 2 && dealerCount != 21){
        console.log('WINNER! Player has BlackJack');
    } else if(playerCount == dealerCount){
        console.log('PUSH');
    }
}

startButton.addEventListener('click',startGame)

function hit(){
    playersHand.push(deck[cardCount]);
    playersHold.innerHTML += `<img src=PNG-cards/${deck[cardCount].number}_of_${deck[cardCount].suites}.png>`;
    playerValue.innerHTML = aceCheck(playersHand);
    if(aceCheck(playersHand) >= 21){
        gameOver(aceCheck(dealersHand),dealersHand, aceCheck(playersHand), playersHand)
    };
    cardCount++;
    cardCounter();
    console.log(playersHand)
}

hitButton.addEventListener('click',hit)
stayButton.addEventListener('click',gameOver)