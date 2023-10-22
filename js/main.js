//Изначальные данные
const PHOTO_OBJECT_COUNT = 25;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 30;
const AVATAR_COUNT = 6;
const MIN_AMOUNT = 1;

//описание фотографии.
const DESCRIPTIONS = [
  'Аккуратный пляж',
  'Путь на пляж',
  'Вид на океан',
  'Фотографиня',
  'Релакс',
  'Новое приобретение',
  'Мой завтрак',
  'Регидратация',
  'Привет лунатикам!',
  'Обувница',
  'Путь в никуда',
  'Гуанчжоу',
  'Когда устали лапки',
  'Вид из иллюминатора',
  'Культурно просвещаемся',
  'Подарок от деда',
  'Том Ям на минималках',
  'Закат',
  'Крабик',
  'Show must go on',
  'Сафари-парк',
];

//примеры комментариев.
const MESSAGE_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Имена авторов
const NAMES = [
  'Ксюся',
  'Марина Александровна',
  'Люда',
  'Ритта',
  'Серёжа',
  'Веля',
];

// Функция получения случайного целого числа из переданного диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

// функция генератор для получения случайных id из указанного диапазона, без повторения
const createRandomId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= max - min + 1) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generatePhotoId = createRandomId(MIN_AMOUNT, PHOTO_OBJECT_COUNT);
const generatePhotoUrl = createRandomId(MIN_AMOUNT, PHOTO_OBJECT_COUNT);
const generateCommentId = createRandomId(MIN_AMOUNT, Infinity);

const createMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(MESSAGE_LINES)
).join(' ');

const createComment = () => ({
  commentId: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AMOUNT, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

//Функция, создающая нужный объект фото с описанием
const createPhoto = () => ({
  photoId: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: (Array.from(
    { length: getRandomInteger(0, COMMENT_COUNT) },
    createComment))
});

//Функция, создающая массив из нужного количества фотографий.
const getPhotos = () => Array.from(
  { length: PHOTO_OBJECT_COUNT }, createPhoto
);

getPhotos();
