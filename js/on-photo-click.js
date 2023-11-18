import { isEscapeKey } from './util.js';

const bodyContainer = document.querySelector('body');

// Ищем разметку для полноэкранного показа и кнопку закрытия
const fullPhotoOverlay = document.querySelector('.big-picture');
const fullPhotoOverlayClose = document.querySelector('.big-picture__cancel');

// Функция, закрывающая окно при нажатии Esc
const onPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    fullPhotoOverlay.classList.add('hidden');
    bodyContainer.classList.remove('modal-open');
  }
};

// Открытие полноразмерного фото по нажатию на миниатюру
const openFullPhoto = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.picture')) {
    fullPhotoOverlay.classList.remove('hidden');
    bodyContainer.classList.add('modal-open');
    // Показываем имя окна при просмотре фото
    const fullPhotoTitle = document.querySelector('.big-picture__title');
    fullPhotoTitle.classList.remove('visually-hidden');
    // Добавляем слушатель на Esc
    document.addEventListener('keydown', onPhotoEscKeydown);
  }
};

// Закрытие полноразмерного фото
const closeFullPhoto = () => {
  fullPhotoOverlay.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEscKeydown);
};

// Закрытие по нажатию на кнопку
fullPhotoOverlayClose.addEventListener('click', closeFullPhoto);

export { openFullPhoto, fullPhotoOverlay };
