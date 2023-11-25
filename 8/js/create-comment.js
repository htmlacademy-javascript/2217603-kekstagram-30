import { MESSAGE_LINES, NAMES } from './data.js';
import { createIdGenerator, getRandomArrayElement, getRandomInteger } from './util.js';

// Изначальные данные
const AVATAR_COUNT = 6;

// Функция создания одной или двух фраз для коммента
const createMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(MESSAGE_LINES)
).join(' ');


// Создание id для комментов
const generateCommentId = createIdGenerator();

// Функция создания коммента
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

export { createComment };
