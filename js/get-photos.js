import { DESCRIPTIONS } from './data.js';
import { createIdGenerator, getRandomArrayElement, getRandomInteger } from './util.js';
import { createComment } from './create-comment.js';

// Изначальные данные
const PHOTO_OBJECT_COUNT = 25;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 30;

// Создание id для фото и адреса фото
const generatePhotoId = createIdGenerator();
const generatePhotoUrl = createIdGenerator();

// Функция, создающая нужный объект фото с описанием
const createPhoto = () => ({
  id: generatePhotoId(),
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

export { getPhotos };
