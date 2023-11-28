import { isEscapeKey } from './util.js';

// Число показанных комментов за раз
const COMMENTS_AT_A_TIME = 5;

// Ищем нужную разметку, большую картинку, кнопку закрытия и шаблон
const bodyContainer = document.querySelector('body');
const commentContainer = document.querySelector('.social__comments');
const fullPhotoOverlay = document.querySelector('.big-picture');
const fullPhotoOverlayClose = fullPhotoOverlay.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('.social__comment');

// Ищем счетчик комментов, общее число комментов, число показанных комментов и кнопку загрузки новых
const commentCount = fullPhotoOverlay.querySelector('.social__comment-count');
const commentTotalCount = fullPhotoOverlay.querySelector('.social__comment-total-count');
const commentLoaderButton = fullPhotoOverlay.querySelector('.comments-loader');
const commentShownCount = fullPhotoOverlay.querySelector('.social__comment-shown-count');

// Переменная-счетчик для комментов и новый пустой массив
let commentsQuantity = 0;
let comments = [];

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

// Создаем один коммент по образцу
const renderComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

// Создаем комменты
const renderComments = () => {
  commentsQuantity += COMMENTS_AT_A_TIME;
  if (commentsQuantity >= comments.length) {
    commentsQuantity = comments.length;
    commentLoaderButton.classList.add('hidden');
  } else {
    commentLoaderButton.classList.remove('hidden');
  }
  const commentFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsQuantity; i++) {
    const comment = renderComment(comments[i]);
    commentFragment.append(comment);
  }
  commentContainer.innerHTML = '';
  commentContainer.append(commentFragment);
  commentShownCount.textContent = commentsQuantity;
  commentTotalCount.textContent = comments.length;
};

// Загрузка комментов по кнопке
const onСommentLoaderButtonClick = () => renderComments();

// Создаем открытое окно с фото
const renderFullPhotos = ({ url, description, likes }) => {
  const fullPhoto = fullPhotoOverlay.querySelector('.big-picture__img img');
  fullPhoto.src = url;
  fullPhoto.alt = description;
  fullPhotoOverlay.querySelector('.social__caption').textContent = description;
  fullPhotoOverlay.querySelector('.likes-count').textContent = likes;
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
  // Добавляем комменты или показываем отсутствие
  comments = photoData.comments;
  if (comments.length > 0) {
    renderComments();
  } else {
    commentContainer.innerHTML = '';
    commentLoaderButton.classList.add('hidden');
    commentCount.innerHTML = 'К этой фотографии нет комментариев.';
  }
  renderFullPhotos(photoData);
};

// Слушатель события клика на кнопку закрытия фото и загрузки комментов
fullPhotoOverlayClose.addEventListener('click', onCloseButtonClick);
commentLoaderButton.addEventListener('click', onСommentLoaderButtonClick);

export { openFullPhoto };
