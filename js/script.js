const cards = document.querySelectorAll('.card-container');

const flipCard = (event) => {
  const cardContainer = event.target.parentNode.parentNode;
  cardContainer.classList.toggle('flipCard');
};

cards.forEach((card) => card.addEventListener('click', flipCard));

class MemoryGame {
  constructor() {
    this.widthField = 0;
  }

  choiceField() {
    const choiceFields = document.getElementsByName('gameField');
    let gameField;
    for (let i = 0; i < choiceFields.length; i++) {
      if (choiceFields[i].checked) {
        gameField = choiceFields[i].value;
      }
    }
    this.widthField = gameField.slice(0, 1);
    console.log(this.widthField);
    return true;
  }

  clearChoice() {
    const choiceField = document.querySelector('.game-container__choice');
    choiceField.remove();
    return true;
  }

  runGame() {
    this.choiceField();
    this.clearChoice();
  }
}


const game = new MemoryGame;
const boundGame = game.runGame.bind(game);



const choiceBtn = document.querySelector('.choice__button');
choiceBtn.addEventListener('click', boundGame);