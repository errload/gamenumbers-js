let minValue, 
    maxValue, 
    answerNumber, 
    orderNumber, 
    gameRun;

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');

function numbersToString(numbers) {

    let result = '';
    let minus;
    const [units, tens, hundreds] = numbers.toString().split('').reverse();

    let unitsMap = new Map([
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

    let tens10To19Map = new Map([
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

    let tensMap = new Map([
        ['2', 'двадцать'],
        ['3', 'тридцать'],
        ['4', 'сорок'],
        ['5', 'пятьдесят'],
        ['6', 'шестьдесят'],
        ['7', 'семьдесят'],
        ['8', 'восемьдесят'],
        ['9', 'девяносто'],
    ]);

    let hundredsMap = new Map([
        ['1', 'сто'],
        ['2', 'двести'],
        ['3', 'триста'],
        ['4', 'четыреста'],
        ['5', 'пятьсот'],
        ['6', 'шестьсот'],
        ['7', 'семьсот'],
        ['8', 'восемьсот'],
        ['9', 'девятьсот'],
    ]);

    if (hundreds != undefined) {
        hundredsMap.forEach((value, key) => {
            if (hundreds == key) {
                result = `${value} `;
            }
        });
    }

    if (tens != undefined) {
        if (tens != 0) {
            if (tens == 1) {
                let num = tens + units;
                tens10To19Map.forEach((value, key) => {
                    if (num == key) {
                        result += `${value} `;
                    }
                });
            } else {
                tensMap.forEach((value, key) => {
                    if (tens == key) {
                        result += `${value} `;
                    }
                });
            }
        }
    }

    if (units != undefined) {
        if (tens != 1 && units != 0) {
            unitsMap.forEach((value, key) => {
                if (units == key) {
                    result += `${value} `;
                }
            });
        } else if (tens > 1 && units != 0) {
            unitsMap.forEach((value, key) => {
                if (units == key) {
                    result += `${value} `;
                }
            });
        }
    }

    if (numbers.toString() == '0') {
        result = '0';
    }

    result = result.trim();
    
    minus = numbers.toString();
    if (parseInt(numbers) < 0) {
        if (minus[0] == '-') {
            result = `минус ${result}`;
        } else {
            result = `- ${result}`;
        }
    }

    if (result.length > 20) {
        result = numbers;
    }

    return result;
}

function startGame() {
    minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
    maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));

    minValue = isNaN(minValue) ? 0 : minValue < -999 ? -999 : minValue;
    maxValue = isNaN(maxValue) ? 100 : maxValue > 999 ? 999 : maxValue;

    if (minValue > maxValue) {
        alert('Вы ввели некорректное число, минимальное значение не может быть больше максимального.');
        startGame();
    } else {
        alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю!`);
    }

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

