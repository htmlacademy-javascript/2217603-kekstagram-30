//Функция-генератор для получения уникальных идентификаторов
function createIdGenerator() {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

// Функция получения случайного целого числа из переданного диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция получения случайного элемента переданного массива
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

// Функция проверки длины строки относительно максимальной
const checkStringLength = (inputString, maxLength) => inputString.length <= maxLength;

// Определяет, является ли кнопка Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export { createIdGenerator, getRandomArrayElement, getRandomInteger, checkStringLength, isEscapeKey };
