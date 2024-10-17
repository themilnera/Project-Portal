let cards = [];
let dealersCards = [];
let playersCards = [];
let money = 200;
let bet = 0;
let playerCardsSum = 0;
let dealerCardsSum = 0;
let started = false;
const cardContainer = document.querySelector(".cardContainer");
const playerCards = document.querySelector(".playerContainer");
const hitButton = document.querySelector(".hit");
const stayButton = document.querySelector(".stay");

const moneyElement = document.querySelector('.money');
const betField = document.querySelector('.bet');
const alertField = document.querySelector('.alertField');

class Card{
    constructor(index, suit, value, color, face, stacked){
        this.index = index;
        this.suit = suit;
        this.value = value;
        this.color = color;
        this.face = face;
        this.stacked = stacked;
    }
    
}



function createDeck(){
    let ix = 0;
    for(let z = 0; z < 4; z++){

        for (let i = 0; i < 13; i++){
            let suit;
            let color;
            if(z == 0){
                suit = "&spades;";
                color = "black";
            }
            if(z == 1){
                suit = "&hearts;";
                color = "red";
            }
            if(z == 2){
                suit = "&clubs;";
                color = "black";
            }
            if(z == 3){
                suit = "&diams;";
                color = "red";
            }
            ix++;

            let value;
            if(i < 10){
                if(i === 0){
                    value = "A";
                }
                else{
                    value = i+1;
                }
            }
            if (i === 10){
                value = "J";
            }
            if (i === 11){
                value = "Q";
            }
            if (i === 12){
                value = "K";
            }
            let card = new Card(ix, suit, value, color, false, true);
            cards.push(card);
        }
    }
}


function displayCardDealer(card){
    
    if(card.face === false){
        cardContainer.innerHTML += `<div class="card">
            <div class="cardBack"><img src="Card-Back.png"></div>
        </div>`;
        return
    }
    if(card.color === "red"){
        cardContainer.innerHTML += `<div class="card">
            <div class="cardLeft red">${card.value}<span class="red">${card.suit}</span></div>
            <div class="cardCenter red"><span class="suitCenter red">${card.suit}</span></div>
            <div class="cardRight red">${card.value}<span class="red">${card.suit}</span></div>
        </div>`;
    }
    else{
        cardContainer.innerHTML += `<div class="card">
            <div class="cardLeft">${card.value}<span>${card.suit}</span></div>
            <div class="cardCenter"><span class="suitCenter">${card.suit}</span></div>
            <div class="cardRight">${card.value}<span>${card.suit}</span></div>
        </div>`;
    }
}
function displayCardPlayer(card){
    
    if(card.face === false){
        playerCards.innerHTML += `<div class="card">
            <div class="cardBack"><img src="Card-Back.png"></div>
        </div>`;
        return
    }
    if(card.color === "red"){
        playerCards.innerHTML += `<div class="card">
            <div class="cardLeft red">${card.value}<span class="red">${card.suit}</span></div>
            <div class="cardCenter red"><span class="suitCenter red">${card.suit}</span></div>
            <div class="cardRight red">${card.value}<span class="red">${card.suit}</span></div>
        </div>`;
    }
    else{
        playerCards.innerHTML += `<div class="card">
            <div class="cardLeft">${card.value}<span>${card.suit}</span></div>
            <div class="cardCenter"><span class="suitCenter">${card.suit}</span></div>
            <div class="cardRight">${card.value}<span>${card.suit}</span></div>
        </div>`;
    }
}

function shuffle(){
    cards.sort(() => Math.random() - .5);
}

function round(){
    playerDraw();
    updateTotals();
    moneyElement.innerText = "Cash: "+money;
    console.log(playerCardsSum);
    if(playerCardsSum < 22){
        updateTotals();
        if(dealerCardsSum < 16){
            dealerDraw();
        }
        if(dealerCardsSum > 21){
            updateTotals();
            drawCards();
            drawTotals();
            checkWinner();
        }
        updateTotals();
        drawCards();
        drawTotals();
    }
    else{
        updateTotals();
        drawCards();
        drawTotals();
        checkWinner();
    }
    
}
function playerDraw(){
    let pDrawnCard = cards.pop();
    playersCards.push(pDrawnCard);
}

function dealerDraw(){
    let dDrawnCard = cards.pop();
    dealersCards.push(dDrawnCard);
}
function drawCards(){
    clearCards();
    console.log(dealersCards);
    console.log(dealerCardsSum);
    dealersCards.forEach(e => {
        e.face = true;
        displayCardDealer(e);
    });
    playersCards.forEach(e => {
        e.face = true;
        displayCardPlayer(e);
    });
}

function updateTotals(){
    playerCardsSum = getSumValue(playersCards);
    dealerCardsSum = getSumValue(dealersCards);
}

function drawTotals(){
    alertField.innerText = "Player: " +playerCardsSum+" Dealer:"+dealerCardsSum;
    
}

function getSumValue(cardArray){
    let sum = 0;
    let aces = 0;
    cardArray.forEach(c => {
        if(isNaN(c.value)){
            if(c.value == 'A'){
                aces++;
            }
            if(c.value == 'J'){
                sum+= 10;
            }
            if(c.value == 'Q'){
                sum+= 10;
            }
            if(c.value == 'K'){
                sum+= 10;
            }
        }
        else{
            sum+= Number(c.value);
        }
    });
    for (let i = 0; i < aces; i++){
        if((sum + aces*10) <= 21){
            sum +=10;
        }
        else{
            sum ++;
        }
    }
    return sum;
}




function hitPressed(){
    if(!started){
        resetBoard();
        let amount = Number(betField.value);
        if(isNaN(amount)){
            alertField.innerText = "Enter a number";
        }
        else if(amount === 0){
            alertField.innerText = "Enter a value above 0";
        }
        else if(amount > money){
            alertField.innerText = "You don't have that much";
        }
        else{
            bet = betField.value;
            money -= Number(bet);
            

            alertField.innerText = "";
            
            started = true;
        }
    }
    if(started){
    
        round();
    }
}
function resetBoard(){
    playersCards = [];
    dealersCards = [];
    cardContainer.innerHTML = "";
    playerCards.innerHTML = "";
}

function checkWinner(){
  
    betField.value = 0;
    started = false;
    if(dealerCardsSum < 15){
        dealerDraw();
        updateTotals();
        drawCards();
        drawTotals();
        checkWinner();
    }
    else if(dealerCardsSum > 21){
        //bust
        alertField.innerText = "Dealer busts";
        money += (bet*2);
        bet = 0;
        moneyElement.innerText = "Cash: "+money;
        return;
    }
    else if(playerCardsSum > 21){
        //bust
        alertField.innerText = "You bust";
        bet = 0;

        return;
    }
    else{
        if(playerCardsSum > dealerCardsSum){
            //win
            alertField.innerText = " You win";
            money += (bet*2);
            moneyElement.innerText = "Cash: "+money;
        }
        if(playerCardsSum < dealerCardsSum){
            //lose
            alertField.innerText = " You lose";
        }
        if(playerCardsSum == dealerCardsSum || (playerCardsSum > 21 && dealerCardsSum > 21)){
            //break even
            alertField.innerText = " Break even";
            money += bet;
            moneyElement.innerText = "Cash: "+money;
        }
        bet = 0;

    }
}
function clearCards(){
    cardContainer.innerHTML = "";
    playerCards.innerHTML = "";
}

//these only run once
createDeck();
shuffle();
moneyElement.innerText = "Cash: "+money;

hitButton.addEventListener("click", hitPressed);
stayButton.addEventListener('click', checkWinner);
