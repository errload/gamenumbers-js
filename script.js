let minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');

orderNumberField.textContent = orderNumber;
answerField.textContent = `Вы загадали число ${answerNumber}?`;

document.querySelector('#btnRetry').addEventListener('click', () => {
    minValue = 0;
    maxValue = 100;
    orderNumber = 0;
});

document.querySelector('#btnOver').addEventListener('click', () => {
    if (gameRun) {
        if (minValue === maxValue){
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.textContent = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.textContent = orderNumber;
            answerField.textContent = `Вы загадали число ${answerNumber}?`;
        }
    }
});

document.querySelector('#btnEqual').addEventListener('click', () => {
    if (gameRun) {
        answerField.textContent = `Я всегда угадываю\n\u{1F60E}`
        gameRun = false;
    }
});

