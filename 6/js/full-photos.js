import { fullPhotoOverlay } from './on-photo-click.js';
import { renderComments } from './render-comments.js';

// Ищем счетчик комментов и кнопку загрузки комментов
const commentCount = fullPhotoOverlay.querySelector('.social__comment-count');
const commentLoaderButton = fullPhotoOverlay.querySelector('.comments-loader');

// Данные для окна из того же объекта, который использовался для отрисовки соответствующей миниатюры.
const createFullPhoto = ({ url, description, likes, comments }) => {
  const fullPhoto = fullPhotoOverlay.querySelector('.big-picture__img img');
  fullPhoto.src = url;
  fullPhoto.alt = description;
  fullPhotoOverlay.querySelector('.social__caption').textContent = description;
  fullPhotoOverlay.querySelector('.likes-count').textContent = likes;
  fullPhotoOverlay.querySelector('.social__comment-shown-count').textContent = comments.lenght;
  // показанных!комментариев
  fullPhotoOverlay.querySelector('.social__comment-total-count').textContent = comments.length;

  return fullPhoto;
};

const renderFullPhotos = (photo) => {
  createFullPhoto(photo);
  renderComments(photo.comments);
  commentCount.classList.add('hidden');
  commentLoaderButton.classList.add('hidden');
};
export { renderFullPhotos };
