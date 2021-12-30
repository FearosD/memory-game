class MemoryGame {
  constructor() {
    this.widthField = 0;
    this.heightField = 0;
    this.correctCards = [];
    this.currentCards = [];
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
    const cardsWrapper = document.querySelector('.cards-wrapper');
    cardsWrapper.classList.add(`column-${this.widthField}`);

    const countCards = this.widthField * this.heightField;

    for (let i = 1; i <= countCards; i += 1) {
      cardsWrapper.insertAdjacentHTML(
        'beforeend',
        `
      <div class="card-container" id="${i}">
        <div class="card">
          <div class="card__front">
          </div>
          <div class="card__back">
          </div>
        </div>
      </div>
      `
      );
    }

    return true;
  }

  shuffleCard() {
    const cardsWrapper = document.querySelector('.cards-wrapper');
    for (let i = cardsWrapper.children.length; i >= 0; i -= 1) {
      cardsWrapper.appendChild(cardsWrapper.children[(Math.random() * i) | 0]);
    }
    return true;
  }

  generateCorrectCard() {
    this.shuffleCard();

    const cards = document.querySelectorAll('.card-container');
    const cardsArr = [];

    cards.forEach((card) => cardsArr.push(card.id));
    this.correctCards = cardsArr.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / 2);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);
    this.correctCards.forEach((cards) => cards.sort((a, b) => a - b));
    console.log(this.correctCards);

    this.correctCards.forEach((pairCards, index) => {
      const [first, second] = pairCards;
      const firstCard = document.querySelector(`[id='${first}'] .card__back`);
      const secondCard = document.querySelector(`[id='${second}'] .card__back`);
      firstCard.classList.add(`img-${index + 1}`);
      secondCard.classList.add(`img-${index + 1}`);
    });

    this.shuffleCard();
    return true;
  }

  checkAnswer(id) {
    this.currentCards.push(id);
    if (this.currentCards.length === 2) return this.checkCorrects();
  }
  compareCards (card1, card2)  {
    if (card1[0] !== card2[0]) return false;
    if (card1[1] !== card2[1]) return false;
    return true;
  }
  checkCorrects() {
    const gameClose = document.querySelector('.game-close');
    gameClose.style.display = 'block';
    const currentCards = this.currentCards.sort((a, b) => a - b);
    const [first, second] = currentCards;
    const firstCard = document.querySelector(`[id='${first}']`);
    const secondCard = document.querySelector(`[id='${second}']`);
    console.log(this.compareCards(this.correctCards, currentCards));
    console.log(currentCards);
  }

  behaviorCard() {
    const cards = document.querySelectorAll('.card-container');

    const flipCard = (event) => {
      const cardContainer = event.target.parentNode.parentNode;
      cardContainer.classList.toggle('flipCard');
    };

    const getId = (event) => {
      const cardContainer = event.target.parentNode.parentNode;
      this.checkAnswer(cardContainer.id);
    };

    cards.forEach((card) => card.addEventListener('click', flipCard));
    cards.forEach((card) => card.addEventListener('click', getId));
  }

  runGame() {
    this.choiceField();
    this.clearChoice();
    this.buildField();
    this.generateCorrectCard();
    this.behaviorCard();
  }
}

const game = new MemoryGame();
const boundGame = game.runGame.bind(game);

const choiceBtn = document.querySelector('.choice__button');
choiceBtn.addEventListener('click', boundGame);
