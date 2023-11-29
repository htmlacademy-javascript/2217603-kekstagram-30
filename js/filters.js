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
const filterBtnDefault = filtersForm.querySelector('#filter-default');
const filterBtnRandom = filtersForm.querySelector('#filter-random');
const filterBtnDiscussed = filtersForm.querySelector('#filter-discussed');

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

// Переменная для фиксации нынешнего фильтра
let currentFilter = FilterType.DEFAULT;

// Отрисовка результата действия фильтра
const repaint = (evt, filter, photos) => {
  if (currentFilter !== filter) {
    const filteredPhotos = handleFilter[filter](photos);
    const photosContainer = document.querySelectorAll('.picture');
    photosContainer.forEach((photo) => photo.remove());
    renderGallery(filteredPhotos);
    activateFilterButton(evt);
    currentFilter = filter;
  }
};

// «Устранение дребезга» - отрисовка не чаще, чем раз в полсекунды
const debouncedRepaint = debounce(repaint, RERENDER_DELAY);

// Запускает работу фильтров
const initFilters = (photos) => {
  filtersContainer.classList.remove('img-filters--inactive');

  filterBtnDefault.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterType.DEFAULT, photos);
    activateFilterButton(evt);
  });
  filterBtnRandom.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterType.RANDOM, photos);
    activateFilterButton(evt);
  });
  filterBtnDiscussed.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterType.DISCUSSED, photos);
    activateFilterButton(evt);
  });
};

export { initFilters };
