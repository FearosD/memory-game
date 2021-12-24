const cards = document.querySelectorAll('.card-container');

const flipCard = (event) => {
  const cardContainer = event.target.parentNode.parentNode;
  cardContainer.classList.toggle('flipCard');
};

cards.forEach((card) => card.addEventListener('click', flipCard));

const choiceField = (event) => {
  const choiceFields = document.getElementsByName('gameField');
  let gameField;
  for (let i = 0; i < choiceFields.length; i++) {
    if (choiceFields[i].checked) {
      gameField = choiceFields[i].value;
    }
  }
  return gameField;
};

const choiceBtn = document.querySelector('.choice__button');

choiceBtn.addEventListener('click', choiceField);
