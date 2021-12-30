class MemoryGame {
  constructor() {
    this.widthField = 0;
    this.heightField = 0;
  }

  choiceField() {
    const choiceFields = document.getElementsByName('gameField');

    let gameField;

    for (let i = 0; i < choiceFields.length; i += 1) {
      if (choiceFields[i].checked) {
        gameField = choiceFields[i].value;
      }
    }

    this.widthField = gameField.slice(0, 1);
    this.heightField = gameField.slice(2);

    return true;
  }

  clearChoice() {
    const choiceField = document.querySelector('.game-container__choice');
    choiceField.remove();
    return true;
  }

  buildField() {
    const cardTemplate = `
    <div class="card-container">
      <div class="card">
        <div class="card__front">
        </div>
        <div class="card__back">
        </div>
      </div>
    </div>
    `;

    const cardsWrapper = document.querySelector('.cards-wrapper');
    cardsWrapper.classList.add(`column-${this.widthField}`);

    const countCards = this.widthField * this.heightField;

    for (let i = 0; i < countCards; i += 1) {
      cardsWrapper.insertAdjacentHTML('beforeend', cardTemplate);
    }

    return true;
  }

  behaviorCard() {
    const cards = document.querySelectorAll('.card-container');

    const flipCard = (event) => {
      const cardContainer = event.target.parentNode.parentNode;
      cardContainer.classList.toggle('flipCard');
    };

    cards.forEach((card) => card.addEventListener('click', flipCard));
  }

  runGame() {
    this.choiceField();
    this.clearChoice();
    this.buildField();
    this.behaviorCard();
  }
}

const game = new MemoryGame();
const boundGame = game.runGame.bind(game);

const choiceBtn = document.querySelector('.choice__button');
choiceBtn.addEventListener('click', boundGame);
