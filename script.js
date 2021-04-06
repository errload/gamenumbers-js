let minValue, //  минимальное значение
    maxValue, // максимальное значение
    answerNumber, // результат (среднее число)
    orderNumber, // счетчик вопросов
    gameRun; // старт игры

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');

const gameStart = document.querySelector('.gameStart');
const gameQuestions = document.querySelector('.gameQuestions');
const gameButtons = document.querySelector('.gameButtons');
const cardFooter = document.querySelector('.cardFooter');
const gameInput = document.querySelector('.gameInput');
const gameText = document.querySelector('.gameText');

const minValueForm = document.querySelector('.minValueForm');
const maxValueForm = document.querySelector('.maxValueForm');

function numbersToString(numbers) {

    let result = '';
    let minus;
    // разбиываем строку на сотни, десятки, единицы
    const [units, tens, hundreds] = numbers.toString().split('').reverse();

    // массивы чисел в строковой форме
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

    // проверяем есть ли сотни
    if (hundreds != undefined) {
        hundredsMap.forEach((value, key) => {
            // если ключ равен числу, записываем в результат строковую форму числа
            if (hundreds == key) {
                result = `${value} `;
            }
        });
    }

    // проверяем есть ли десятки
    if (tens != undefined) {
        // если нет десятка после сотни, то это единица
        if (tens != 0) {
            // если она равна 1, то число от 10 до 19
            if (tens == 1) {
                // берем последние 2 числа, конкатенируем и сравниваем с ключом массива
                let num = tens + units;
                tens10To19Map.forEach((value, key) => {
                    // если ключ равен числу, записываем в результат строковую форму числа
                    if (num == key) {
                        result += `${value} `;
                    }
                });
            // иначе десятки есть от 20 до 90
            } else {
                tensMap.forEach((value, key) => {
                    // если ключ равен числу, записываем в результат строковую форму числа
                    if (tens == key) {
                        result += `${value} `;
                    }
                });
            }
        }
    }

    // проверяем единицы
    if (units != undefined) {
        // если единица не равно 0 и при этом десяток не равен 1, значит число не 10-19
        if (tens != 1 && units != 0) {
            unitsMap.forEach((value, key) => {
                // поэтому берем только единицу без нуля
                if (units == key) {
                    result += `${value} `;
                }
            });
        // иначе если десяток больше, чем 10-19
        } else if (tens > 1 && units != 0) {
            unitsMap.forEach((value, key) => {
                // берем только единицу без нуля
                if (units == key) {
                    result += `${value} `;
                }
            });
        }
    }

    // если это ноль, то это 0 и никак иначе
    if (numbers.toString() == '0') {
        result = '0';
    }

    // убираем пробелы
    result = result.trim();
    
    // переводим число в строку для изъятия первого символа
    minus = numbers.toString();
    // если число отрицательное
    if (parseInt(numbers) < 0) {
        // и первый символ минус
        if (minus[0] == '-') {
            // добавляем минус в строковую форму
            result = `минус ${result}`;
        } else {
            // добавляем минус в числовую форму форму
            result = `- ${result}`;
        }
    }

    // если длина строки больше 20 символов, записываем числом
    if (result.length > 20) {
        result = numbers;
    }

    // возвращаем значение
    return result;
}

function startGame() {
    // обнуляем формы и поля ввода
    orderNumberField.textContent = 'Угадайка';      
    gameStart.style.display = 'none';
    gameQuestions.style.display = 'none';
    gameButtons.style.display = 'none';
    cardFooter.style.display = 'none';
    gameInput.style.display = 'block';

    minValueForm.value = 0;
    maxValueForm.value = 100;

    // предлагаем ввести минимальные и максимальные значения числа
    document.querySelector('.btnGameInput').addEventListener('click', () => {
        // берем минимальное и максимальное значение из формы и преобразуем в число
        minValue = parseInt(minValueForm.value);
        maxValue = parseInt(maxValueForm.value);

        // проверяем являются ли значения числом и находятся ли в диапазоне -999 и 999
        // иначе возвращаем 0 и 100
        minValue = isNaN(minValue) ? 0 : minValue < -999 ? -999 : minValue;
        maxValue = isNaN(maxValue) ? 100 : maxValue > 999 ? 999 : maxValue;

        // прячем блок с вводом значений и предлагаем загадать число
        gameInput.style.display = 'none';
        cardFooter.style.display = 'block';
        gameStart.style.display = 'block';

        // если минимальное введено больше максимального, сообщаем об этом
        if (minValue > maxValue) {
            gameText.textContent = `Вы ввели некорректное число.
            Минимальное значение не может быть больше максимального.
            Попробуйте ввести заново.`;
            document.querySelector('.divBtnGameText').style.display = 'none';
            startGame();
        } else {
            // иначе предлагаем загадать число
            gameText.textContent = `Загадайте любое число от ${minValue} до ${maxValue}`;
            // запускаем игру
            document.querySelector('.btnGameText').addEventListener('click', () => {
                gameStart.style.display = 'none';
                gameQuestions.style.display = 'block';
                gameButtons.style.display = 'block';
                
                // делим значения пополам и даем средний результат первого вопроса
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber = 1;
                // запуск игры
                gameRun = true;

                // вывод значений
                orderNumberField.textContent = `Вопрос № ${orderNumber}`;
                answerField.textContent = `Вы загадали число ${numbersToString(answerNumber)}?`;
            })
        }  
    });
}

// запуск игры
startGame();
// кнопка рестарта игры
document.querySelector('#btnRetry').addEventListener('click', startGame);

// кнопка верно
document.querySelector('#btnEqual').addEventListener('click', () => {
    // если игра запущена
    if (gameRun) {
        // рандом их трех ответов
        const phraseRandom = Math.round(Math.random()*3);
        const answerPhrase = (phraseRandom === 1) ?
                `Я всегда угадываю\n\u{1F60E}`:
                (phraseRandom === 2) ?
                `Тебе меня не победить!\n\u{1F60E}` :
                `Давай, рискни еще разок!\n\u{1F60E}`;
        answerField.textContent = answerPhrase;
        // конец игры
        gameRun = false;
    }
});

// кнопка больше
document.querySelector('#btnOver').addEventListener('click', () => {
    // если игры запущена
    if (gameRun) {
        // если количество вариантов закончилось, а число не угадано
        if (minValue === maxValue) {
            // рандом из трех ответов
            const phraseRandom = Math.round(Math.random()*3);
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F636}` :
                (phraseRandom === 2) ?
                `Я сдаюсь...\n\u{1F636}` :
                `Давай-ка попробую еще разок...\n\u{1F636}`;

            answerField.textContent = answerPhrase;
            // конец игры
            gameRun = false;
        } else {
            // иначе среднее значение становится минимальным, и далее играем в оставшейся половине
            minValue = answerNumber + 1; 
            // берем среднее значение двух чисел
            answerNumber = Math.floor((minValue + maxValue) / 2);

            // увеличиваем счетчик вопроса
            orderNumber++;
            orderNumberField.textContent = `Вопрос № ${orderNumber}`;;

            // рандом из трех вопросов
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

// кнопка меньше
document.querySelector('#btnLess').addEventListener('click', () => {
    // если игры запущена
    if (gameRun) {
        // если количество вариантов закончилось, а число не угадано
        if (minValue === maxValue) {
            // рандом из трех ответов
            const phraseRandom = Math.round(Math.random()*3);
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F636}` :
                (phraseRandom === 2) ?
                `Я сдаюсь...\n\u{1F636}` :
                `Давай-ка попробую еще разок...\n\u{1F636}`;

            answerField.textContent = answerPhrase;
            // конец игры
            gameRun = false;
        } else {
            // иначе среднее значение становится максимальным, и далее играем в оставшейся половине
            maxValue = answerNumber;
            // берем среднее значение двух чисел
            answerNumber = Math.floor((minValue + maxValue) / 2);

            // увеличиваем счетчик вопроса
            orderNumber++;
            orderNumberField.textContent = `Вопрос № ${orderNumber}`;;
            
            // рандом из трех вопросов
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

