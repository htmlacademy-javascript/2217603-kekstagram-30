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

// Функция для расчета, укладывается ли время встречи в рабочий день
const calculateWorkTime = (workStart, workEnd, meetingStart, meetingDuration) => {
  const minutesPerHour = 60;
  const arrayWorkStart = workStart.split(':');
  const arrayWorkEnd = workEnd.split(':');
  const arrayMeetingStart = meetingStart.split(':');
  const times = arrayWorkStart.concat(arrayWorkEnd).concat(arrayMeetingStart);
  const numTimes = [];
  times.forEach((time) => {
    numTimes.push(Number(time));
  });
  const numTimesMinutes = [];
  for (let i = 0; i < numTimes.length; i++) {
    numTimesMinutes[i] = numTimes[i];
    if (i % 2 === 0) {
      numTimesMinutes[i] = numTimes[i] * minutesPerHour;
    }
  }
  const arrayWorkStartMinutes = numTimesMinutes.slice(0, 2);
  const arrayWorkEndMinutes = numTimesMinutes.slice(2, 4);
  const arrayMeetingStartMinutes = numTimesMinutes.slice(4, 6);
  const workStartMinutes = arrayWorkStartMinutes.reduce((sum, current) => (sum + current), 0);
  const workEndMinutes = arrayWorkEndMinutes.reduce((sum, current) => (sum + current), 0);
  const meetingStartMinutes = arrayMeetingStartMinutes.reduce((sum, current) => (sum + current), 0);
  const timeMettingEndMinutes = meetingStartMinutes + meetingDuration;
  return (
    meetingStartMinutes < workEndMinutes && workStartMinutes
    <= meetingStartMinutes && timeMettingEndMinutes
    <= workEndMinutes
  );
};

calculateWorkTime('08:00', '17:30', '14:00', 90); // true
calculateWorkTime('8:0', '10:0', '8:0', 120); // true
calculateWorkTime('08:00', '14:30', '14:00', 90); // false
calculateWorkTime('14:00', '17:30', '08:0', 90); // false
calculateWorkTime('8:00', '17:30', '08:00', 900); // false
