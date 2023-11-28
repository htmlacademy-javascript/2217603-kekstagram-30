// Количество миллисекунд показа сообщения об ошибке
const DATA_ERROR_SHOW_TIME = 5000;

// Шаблон сообщения об ошибке загрузки изображений от других пользователей
const dataErrorTemplate = document.querySelector('#data-error')
  .content.querySelector('.data-error');

// Определяет, является ли кнопка Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

// Показывает ошибку загрузки
const showDataError = () => {
  const dataError = dataErrorTemplate.cloneNode(true);
  document.body.append(dataError);

  setTimeout(() => {
    dataError.remove();
  }, DATA_ERROR_SHOW_TIME);
};

// Показывает случайные не повторяющиеся фотографии
const shufflePhotos = (photos) => {
  const copyPhotos = photos.slice();
  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyPhotos[i], copyPhotos[j]] = [copyPhotos[j], copyPhotos[i]];
  }
  return copyPhotos;
};

// Устранение дребезга
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showDataError, shufflePhotos, debounce };
