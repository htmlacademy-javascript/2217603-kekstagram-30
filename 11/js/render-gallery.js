import { renderPhotos } from './render-photos.js';
import { openFullPhoto } from './open-full-photos.js';

// Ищет родителя для будущих фотографий в разметке
const photosContainer = document.querySelector('.pictures');

// Показывает фотографии при нажатии на миниатюру с нужным id
const renderGallery = (photos) => {
  photosContainer.addEventListener('click', (evt) => {
    const photo = evt.target.closest('[data-photo-id]');
    if (!photo) {
      return;
    }
    evt.preventDefault();
    const photoId = +photo.dataset.photoId;
    const photoData = photos.find(({ id }) => id === photoId);
    openFullPhoto(photoData);
  });
  renderPhotos(photos, photosContainer);
};

export { renderGallery };
