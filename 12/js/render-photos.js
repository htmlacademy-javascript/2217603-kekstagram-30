// Ищем шаблон для миниатюр в разметке
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Показываем название раздела на странице
const photosTitle = document.querySelector('.pictures__title');
photosTitle.classList.remove('visually-hidden');

// Функция, создающая одну миниатюру из передаваемого объекта
const createThumbnail = ({ url, description, likes, comments, id }) => {
  const thumbnail = photoTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.photoId = id;
  return thumbnail;
};

// Добавляет нужное количество фото в фрагмент и затем этот фрагмент в нужный контейнер в DOM
const renderPhotos = (photosArray, photosContainer) => {
  const photoFragment = document.createDocumentFragment();

  photosArray.forEach((photoItem) => {
    const thumbnails = createThumbnail(photoItem);
    photoFragment.append(thumbnails);
  });

  photosContainer.append(photoFragment);
};

export { renderPhotos };
