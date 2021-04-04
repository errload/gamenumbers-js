let minValue, 
    maxValue, 
    answerNumber, 
    orderNumber, 
    gameRun;

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');

function numbersToString(numbers) {
    let result = '';
    numbers = String(numbers);

    let zeroToNine = new Map([
        ['0', '0'],
        ['1', 'один'],
        ['2', 'два'],
        ['3', 'три'],
        ['4', 'четыре'],
        ['5', 'пять'],
        ['6', 'шесть'],
        ['7', 'семь'],
        ['8', 'восемь'],
        ['9', 'девять'],
    ]);

    let elevenToNineteen = new Map([
        ['10', 'десять'],
        ['11', 'одинадцать'],
        ['12', 'двенадцать'],
        ['13', 'тринадцать'],
        ['14', 'четырнадцать'],
        ['15', 'пятнадцать'],
        ['16', 'шестнадцать'],
        ['17', 'семнадцать'],
        ['18', 'восемнадцать'],
        ['19', 'девятнадцать'],
    ]);

    let twentyToNinety = new Map([
        ['2', 'двадцать'],
        ['3', 'тридцать'],
        ['4', 'сорок'],
        ['5', 'пятьдесят'],
        ['6', 'шестьдесят'],
        ['7', 'семьдесят'],
        ['8', 'восеьдесят'],
        ['9', 'девяносто'],
    ]);

    switch (numbers.length) {
        case 1:
            zeroToNine.forEach((value, key) => {
                if (numbers == key) {
                    result = value;
                }
            });
            break;
        case 2:
            elevenToNineteen.forEach((value, key) => {
                if (numbers == key) {
                    result = value;
                }
            });
            
            if (result == '') {
                twentyToNinety.forEach((value, key) => {
                    if (numbers[0] == key) {
                        result = value;
                    }
                });

                zeroToNine.forEach((value, key) => {
                    if (numbers[1] == key && numbers[1] != '0') {
                        result += ` ${value}`;
                    }
                });
            }
    }
    
    // if (result.length > 20) {
    //     result = numbers;
    // }

    return result;
}

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
    answerField.textContent = `Вы загадали число ${numbersToString(answerNumber)}?`;
}

startGame();

document.querySelector('#btnRetry').addEventListener('click', startGame);

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
                `Вы загадали число ${numbersToString(answerNumber)}?`:
                (phraseRandom === 2) ?
                `Да это легко! Число ${numbersToString(answerNumber)}?` :
                `Наверное, это число ${numbersToString(answerNumber)}?`;
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
                `Вы загадали число ${numbersToString(answerNumber)}?`:
                (phraseRandom === 2) ?
                `Да это легко! Ты загадал ${numbersToString(answerNumber)}?` :
                `Наверное, это число ${numbersToString(answerNumber)}?`;
            answerField.textContent = answerPhrase;
        }
    }
});

