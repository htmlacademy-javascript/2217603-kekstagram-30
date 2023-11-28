import { renderGallery } from './render-gallery.js';
import { shufflePhotos, debounce } from './util.js';

// Количество случайных не повторяющихся фотографий.
const RANDOM_PHOTO_COUNT = 10;

// Задержка отрисовки фото
const RERENDER_DELAY = 500;

// Объект с типами фильтров
const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

// Ищем нужную разметку
const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');
const filterButtonDefault = filtersForm.querySelector('#filter-default');
const filterButtonRandom = filtersForm.querySelector('#filter-random');
const filterButtonDiscussed = filtersForm.querySelector('#filter-discussed');

// Основная функция организации фильтра
const handleFilter = {
  [FilterType.DEFAULT]: (photos) => photos,
  [FilterType.RANDOM]: (photos) => shufflePhotos(photos).slice(0, RANDOM_PHOTO_COUNT),
  [FilterType.DISCUSSED]: (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length)
};

// Меняет активную кнопку фильтра с предыдущей на нажатую
const activateFilterButton = (evt) => {
  const buttonActive = filtersContainer.querySelector('.img-filters__button--active');
  buttonActive.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

// Отрисовка результата действия фильтра
const renderFilters = (evt, filter, photos) => {
  const filteredPhotos = handleFilter[filter](photos);
  const photosContainer = document.querySelectorAll('.picture');
  photosContainer.forEach((photo) => photo.remove());
  renderGallery(filteredPhotos);
  activateFilterButton(evt);
};

// «Устранение дребезга» - отрисовка не чаще, чем раз в полсекунды
const debouncedSetFilters = debounce(renderFilters, RERENDER_DELAY);

// Запускает работу фильтров
const initFilters = (photos) => {
  filtersContainer.classList.remove('img-filters--inactive');

  filterButtonDefault.addEventListener('click', (evt) => {
    debouncedSetFilters(evt, FilterType.DEFAULT, photos);
    activateFilterButton(evt);
  });
  filterButtonRandom.addEventListener('click', (evt) => {
    debouncedSetFilters(evt, FilterType.RANDOM, photos);
    activateFilterButton(evt);
  });
  filterButtonDiscussed.addEventListener('click', (evt) => {
    debouncedSetFilters(evt, FilterType.DISCUSSED, photos);
    activateFilterButton(evt);
  });
};

export { initFilters };
