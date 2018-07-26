 /*
 * Create a list that holds all of your cards
 */

 function Card(cardSrc) {
	this.cardSrc = cardSrc;
 }
  
 let cardList = [

 	new Card("fa fa-diamond"),
	new Card("fa fa-paper-plane-o"),
	new Card("fa fa-paper-plane-o"),
	new Card("fa fa-anchor"),
	new Card("fa fa-anchor"),
	new Card("fa fa-bolt"),
	new Card("fa fa-bolt"),
	new Card("fa fa-cube"),
	new Card("fa fa-cube"),
	new Card("fa fa-leaf"),
	new Card("fa fa-leaf"),
 	new Card("fa fa-bicycle"),
	new Card("fa fa-bicycle"),
	new Card("fa fa-bomb"),
	new Card("fa fa-bomb"),
	new Card("fa fa-diamond")
	];
 
 //modal taken from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
  // Get the modal
let modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];



let c = 0;
let t;
let timer_is_on = 0;
 
let moveCounter = 0, matchPoints = 0, holdRow = -1, starCount = 3;
 
let currentDeck = document.querySelectorAll(".card"); 
const numberOfCards = currentDeck.length;
let currentCard;  
let starCollection = document.querySelector(".stars"); 

initFields();
 
  
 function initFields() {
	
	stopCount();
	document.getElementsByClassName("moves")[0].textContent = 0; 	
	document.getElementsByClassName("timed")[0].textContent = 0;
	moveCounter = 0; 
	matchPoints = 0;
	holdRow = -1;
	c = 0, t = 0;
	starCount = 3;
		
	for (i = 0; i < numberOfCards; i++) {
		currentDeck[i].classList.remove("match", "open", "show", "misMatch");		
	}  

	for (i = 0; i < 3; i++) {
		starCollection.children[i].children[0].style.color = "yellow";	
	}
	
	shuffle();
	//startCount();
 }
 
 
 function setStarColor () {
	
	if(moveCounter === 26) {
		//starCollection.children[1].children[0].setAttribute("class", 	"");
		 starCollection.children[1].children[0].style.color = "black";
		 starCount--;
	}	
	
	if(moveCounter === 15) {
		 //starCollection.children[2].children[0].setAttribute("class", "");	 
		 starCollection.children[2].children[0].style.color = "black";
		 starCount--;
	}
 }
 
 
 
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle() {
	
    let currentIndex = cardList.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardList[currentIndex];
        cardList[currentIndex] = cardList[randomIndex];
        cardList[randomIndex] = temporaryValue;
    }
	
}//end shuffle


function incrementMoveCounter()
{
	moveCounter++;
	document.getElementsByClassName("moves")[0].textContent = moveCounter;
	setStarColor();
}

function applyMatch (numb) {
	
	matchPoints++;
	currentCard = currentDeck[numb];
	
	currentDeck[numb].classList.add("match");
	currentDeck[holdRow].classList.add("match");
	
	if(matchPoints == 8)
	{		
	    window.setTimeout(gameOver, 500);			
	}//endIf
		
}

 function gameOver() {
	 stopCount();
	 setModalText();
	 initFields();
 }

 function setModalText() {
	let modalContent = document.querySelector(".modal-content");
	modal.style.display = "block";  
	modalContent.children[1].innerText = "Congrats! You win!!!";
	modalContent.children[2].innerText = "It took:   " + c + " seconds..." + "  and  " + moveCounter + " moves.\n" +
										   " You earned " + starCount + " star!";
 }
 
 
function flipCheck (numb) {
	currentCard = currentDeck[numb];
	if( (currentCard.classList.contains("match") == false) && (currentCard.classList.contains("open") == false) && (holdRow != numb) ) {
		flipLogic(numb);
		incrementMoveCounter();
	} //endIf	
}//end flipCheck



function flipLogic (numb) {
	
	startCount();
	currentCard = currentDeck[numb];		
	
	if(holdRow === -1) {
		holdRow = numb;
 		flipCardFaceUp(numb);
	} else {
		if ((cardList[numb].cardSrc === cardList[holdRow].cardSrc) === true) {
			//match
			flipCardFaceUp(numb);
			applyMatch(numb);
			
			//nonMatch	
		} else {	
			flipCardFaceUp(numb);
			window.setTimeout(misMatch, 100);
			clearInterval(misMatch);
			window.setTimeout(flipCardFaceDown, 500);
		}//endIf		
			holdRow = -1;		
	}
}

function misMatch () {
	
	for (i = 0; i < numberOfCards; i++) {
		
		if((currentDeck[i].classList.contains("open") == true) && 
		(currentDeck[i].classList.contains("match") == false))  {
			currentDeck[i].classList.add("mismatch");	
		}//endIf
	}//endFor		
}//end-misMatch

 
function flipCardFaceDown() {
	
	for (i = 0; i < numberOfCards; i++) {
		
		if(currentDeck[i].classList.contains("match") == false) {
			currentDeck[i].classList.remove("open", "show", "mismatch");
		}		
	}
 }//end flipCardFaceDown


function flipCardFaceUp(numb) {

	currentCard = currentDeck[numb];

	let newCardValue  = "<i class=\"" + cardList[numb].cardSrc + "\"></i>";
	currentCard.innerHTML = newCardValue;
 	currentDeck[numb].childNodes[0].className = "";
	currentDeck[numb].childNodes[0].className  = cardList[numb].cardSrc;
	currentDeck[numb].classList.add("show", "open");
	
 }//end flipCardFaceUp


 
 
 //time functions taken from: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_settimeout_cleartimeout2
 function timedCount() {

    document.getElementsByClassName("timed")[0].textContent = c;
    c = c + 1;	
    t = setTimeout(function(){ timedCount() }, 1000);
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
}
 
 
 ///////////////////
 
 
//Code used from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
// When the user clicks on <span> (x), close the modal

myBtn.onclick = function() {
    modal.style.display = "none";
	initFields();
}


span.onclick = function() {
    modal.style.display = "none";
	initFields();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
		initFields();
    }
}
 
 
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
