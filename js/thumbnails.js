// Ищем шаблон для миниатюр в разметке
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Показываем название раздела на странице
const photosTitle = document.querySelector('.pictures__title');
photosTitle.classList.remove('visually-hidden');

// Функция, создающая одну миниатюру из передаваемого объекта
const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = photoTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

export { createThumbnail };

