import { renderFullPhotos } from './full-photos.js';
import { createThumbnail } from './thumbnails.js';
import { openFullPhoto } from './on-photo-click.js';

// Ищет родителя для будущих фотографий в разметке
const photosContainer = document.querySelector('.pictures');

// Добавляет нужное количество фото в фрагмент и затем этот фрагмент в DOM
const renderPhotos = (photosArray) => {
  const pictureFragment = document.createDocumentFragment();

  photosArray.forEach((photoItem) => {
    const thumbnails = createThumbnail(photoItem);
    pictureFragment.append(thumbnails);

    const onThumbnailClick = () => {
      renderFullPhotos(photoItem);
      photosContainer.addEventListener('click', openFullPhoto);
    };
    thumbnails.addEventListener('click', onThumbnailClick);
  });

  photosContainer.append(pictureFragment);
};

export { renderPhotos };
