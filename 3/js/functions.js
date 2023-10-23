//Функция для проверки длины строки.
const checkStringLength = (inputString, maxLength) => inputString.length <= maxLength;

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

//Функция для проверки, является ли строка палиндромом.
const isPalindrome = (string) => {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  let invertedString = '';
  for (let i = normalizeString.length - 1; i >= 0; i--) {
    invertedString += normalizeString[i];
  }
  const result = (invertedString === normalizeString) ? 'Строка является палиндромом' : 'Строка не является палиндромом';
  return result;
};

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');

//Функция, которая извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
const findNumbers = (string) => {
  string = string.toString();
  let result = '';
  for (let i = 0; i <= string.length - 1; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
};

findNumbers('2023 год');
findNumbers('ECMAScript 2022');
findNumbers('1 кефир, 0.5 батона');
findNumbers('агент 007');
findNumbers('а я томат');
findNumbers(2023);
findNumbers(-1);
findNumbers(1.5);
