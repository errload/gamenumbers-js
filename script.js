let minValue, maxValue, answerNumber, orderNumber, gameRun;

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');

function startGame() {
    minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
    maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));

    minValue = minValue || 0;
    maxValue = maxValue || 100;

    minValue = minValue < -999 ? -999 : minValue;
    maxValue = maxValue > 999 ? 999 : maxValue;

    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю!`);

    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;

    orderNumberField.textContent = orderNumber;
    answerField.textContent = `Вы загадали число ${answerNumber}?`;
}

startGame();
document.querySelector('#btnRetry').addEventListener('click', startGame);

document.querySelector('#btnOver').addEventListener('click', () => {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random()*3);
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F636}` :
                (phraseRandom === 2) ?
                `Я сдаюсь...\n\u{1F636}` :
                `Давай-ка попробую еще разок...\n\u{1F636}`;

            answerField.textContent = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1; 
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.textContent = orderNumber;

            const phraseRandom = Math.round(Math.random()*3);
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали число ${answerNumber}?`:
                (phraseRandom === 2) ?
                `Да это легко! Число ${answerNumber}?` :
                `Наверное, это число ${answerNumber}?`;
            answerField.textContent = answerPhrase;
        }
    }
});

document.querySelector('#btnLess').addEventListener('click', () => {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random()*3);
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F636}` :
                (phraseRandom === 2) ?
                `Я сдаюсь...\n\u{1F636}` :
                `Давай-ка попробую еще разок...\n\u{1F636}`;

            answerField.textContent = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.textContent = orderNumber;
            
            const phraseRandom = Math.round(Math.random()*3);
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали число ${answerNumber}?`:
                (phraseRandom === 2) ?
                `Да это легко! Ты загадал ${answerNumber}?` :
                `Наверное, это число ${answerNumber}?`;
            answerField.textContent = answerPhrase;
        }
    }
});

document.querySelector('#btnEqual').addEventListener('click', () => {
    if (gameRun) {
        const phraseRandom = Math.round(Math.random()*3);
        const answerPhrase = (phraseRandom === 1) ?
                `Я всегда угадываю\n\u{1F60E}`:
                (phraseRandom === 2) ?
                `Тебе меня не победить!\n\u{1F60E}` :
                `Давай, рискни еще разок!\n\u{1F60E}`;
        answerField.textContent = answerPhrase;
        gameRun = false;
    }
});

