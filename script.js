const gameContainer = document.getElementById("game");
const alreadyClickedCards = [];
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // give the div a data attribute to indicate if the card is matched already
    newDiv.setAttribute('data-is_matched', false);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


function handleCardClick(e) {
  let clickedCard = e.target;
  alreadyClickedCards.push(clickedCard);
  let firstCard = alreadyClickedCards[0];
  let secondCard = alreadyClickedCards[1];

  let clickedCardIndex = function () {
    return alreadyClickedCards.indexOf(clickedCard);
  }

  // rule out clicking more than 2 cards at a time
  if (alreadyClickedCards.length > 2) {
    alreadyClickedCards.splice(clickedCardIndex, 1);
    return;
  }
  // rule out clicking the same card twice in a row
  if (firstCard === secondCard) {
    alreadyClickedCards.splice(clickedCardIndex, 1);
    return;
  }

  //change the card background
  clickedCard.style.backgroundColor = clickedCard.className;

  //timer to change color back if a match isn't found
  const timer = setTimeout(function () {
    firstCard = alreadyClickedCards[0];
    secondCard = alreadyClickedCards[1];
    let isMatched = JSON.parse(clickedCard.getAttribute('data-is_matched'));


    //check that it's not already matched
    if (!isMatched) {
      //check that 2 cards were clicked
      if (firstCard && secondCard) {
        if (firstCard.className === secondCard.className) {
          firstCard.setAttribute('data-is_matched', true);
          secondCard.setAttribute('data-is_matched', true);
        }
        else {
          //if not a match, turn the color back
          clickedCard.style.backgroundColor = '';
        }
      }

      else {
        // if only 1 card, turn the color back
        clickedCard.style.backgroundColor = '';
      }
    }
    //remove the current card from the array
    alreadyClickedCards.splice(clickedCardIndex, 1);
  }, 1000);
}

// when the DOM loads
createDivsForColors(shuffledColors);
