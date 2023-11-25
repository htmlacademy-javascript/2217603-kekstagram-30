import { isEscapeKey } from './util.js';
import { renderComments } from './render-comments.js';

// Число показанных комментов за раз
const COMMENTS_AT_A_TIME = 5;

// Ищем нужную разметку, большую картинку, кнопку закрытия
const bodyContainer = document.querySelector('body');
const commentContainer = document.querySelector('.social__comments');
const fullPhotoOverlay = document.querySelector('.big-picture');
const fullPhotoOverlayClose = fullPhotoOverlay.querySelector('.big-picture__cancel');

// Ищем счетчик комментов, общее число комментов, число показанных комментов и кнопку загрузки новых
const commentCount = fullPhotoOverlay.querySelector('.social__comment-count');
const commentTotalCount = fullPhotoOverlay.querySelector('.social__comment-total-count');
const commentLoaderButton = fullPhotoOverlay.querySelector('.comments-loader');
const commentShownCount = fullPhotoOverlay.querySelector('.social__comment-shown-count');

// Переменная-счетчик для комментов
let commentsQuantity = 0;

// Закрытие полноразмерного фото
const closeFullPhoto = () => {
  fullPhotoOverlay.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEscKeydown);
};

// Функция-обработчик для нажатия на кнопку закрытия
const onCloseButtonClick = () => {
  closeFullPhoto();
};

// Функция, закрывающая окно при нажатии Esc
function onPhotoEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
}

// Создаем открытое окно с фото
const renderFullPhotos = ({ url, description, likes, comments }) => {
  const fullPhoto = fullPhotoOverlay.querySelector('.big-picture__img img');
  fullPhoto.src = url;
  fullPhoto.alt = description;
  fullPhotoOverlay.querySelector('.social__caption').textContent = description;
  fullPhotoOverlay.querySelector('.likes-count').textContent = likes;
  commentTotalCount.textContent = comments.length;

  // Обновляет список комментариев
  const upDateComment = () => {
    commentsQuantity += COMMENTS_AT_A_TIME;
    if (commentsQuantity >= comments.length) {
      commentsQuantity = comments.length;
      commentLoaderButton.classList.add('hidden');
      commentLoaderButton.removeEventListener('click', upDateComment);
    } else {
      commentLoaderButton.classList.remove('hidden');
      commentLoaderButton.addEventListener('click', upDateComment);
    }

    commentContainer.innerHTML = '';
    commentContainer.append(renderComments(comments.slice(0, commentsQuantity)));
    commentShownCount.textContent = commentsQuantity;
  };

  if (comments.length) {
    upDateComment();
  } else {
    commentContainer.innerHTML = '';
    commentLoaderButton.classList.add('hidden');
    commentCount.innerHTML = 'К этой фотографии нет комментариев.';
  }
};

// Открытие полноразмерного фото по нажатию на миниатюру
const openFullPhoto = (photoData) => {
  commentsQuantity = 0;
  fullPhotoOverlay.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  // Показываем имя окна при просмотре фото
  const fullPhotoTitle = document.querySelector('.big-picture__title');
  fullPhotoTitle.classList.remove('visually-hidden');
  // Добавляем слушатель на Esc
  document.addEventListener('keydown', onPhotoEscKeydown);
  renderFullPhotos(photoData);
};

// Закрытие по нажатию на кнопку
fullPhotoOverlayClose.addEventListener('click', onCloseButtonClick);

export { openFullPhoto };
