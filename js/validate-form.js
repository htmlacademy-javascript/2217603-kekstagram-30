import { isEscapeKey } from './util.js';

// Ищем нужную разметку, форму, кнопку закрытия, инпуты
const bodyContainer = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const fileField = document.querySelector('.img-upload__input');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

// Исходные данные
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const errorTexts = {
  INVALID_COUNT: 'Превышено количество хэш-тегов',
  NOT_UNIQUE: 'Хэш-теги повторяются',
  INVALID_REGEXP: 'Введён невалидный хэш-тег',
};

// Создаем начальные настройки для пристин
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

// Открытие формы редактирования загруженного фото
const openFormUpload = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  // // Показываем имя окна при загрузке фото
  // const imgUploadTitle = document.querySelector('.img-upload__title');
  // imgUploadTitle.classList.remove('visually-hidden');
  document.addEventListener('keydown', onFormEscKeydown);
};

// Закрытие формы редактирования фото
const closeFormUpload = () => {
  imgUploadForm.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
};

// Если фокус находится в поле ввода хэш-тега, отменяет закрытие при нажатии на Esc.
const isFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

// Функция, закрывающая окно при нажатии Esc
function onFormEscKeydown(evt) {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closeFormUpload();
  }
}

// Приводит хэштеги к единому виду в массив
const normalizeHashtags = (str) => str.trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

// Проверяет хэштег на соответствие регулярному выражению
const checkValidateHashtag = (value) => normalizeHashtags(value).every((hashtag) => HASHTAG_SYMBOLS.test(hashtag));

// Проверяет количество хэштегов в списке
const checkHashtagListLength = (value) => normalizeHashtags(value).length <= MAX_HASHTAG_COUNT;

// Проверяет хэштег на уникальность (один и тот же хэш-тег не может быть использован дважды)
const checkUniqueHashtags = (value) => {
  const lowerCaseHashtags = normalizeHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

// Функция проверки длины комментария
const checkCommentLength = (comments) => comments.length <= MAX_COMMENT_LENGTH;

// Валидация хэштега по регулярному выражению
pristine.addValidator(
  hashtagField,
  checkValidateHashtag,
  errorTexts.INVALID_REGEXP,
  1,
  true
);

// Валидация по количеству хэштегов за раз
pristine.addValidator(
  hashtagField,
  checkHashtagListLength,
  errorTexts.INVALID_COUNT,
  2,
  true
);

// Валидация на уникальность хэштега
pristine.addValidator(
  hashtagField,
  checkUniqueHashtags,
  errorTexts.NOT_UNIQUE,
  3,
  true
);

// Валидация длины комментария
pristine.addValidator(
  commentField,
  checkCommentLength,
  'Длина комментария более 140 символов'
);

// Функция-обработчик для нажатия на кнопку закрытия
const onCloseButtonClick = () => {
  closeFormUpload();
};

// Открытие формы редактирования после загрузки изображения
const onFormUploadChange = () => {
  openFormUpload();
};

// Запуск валидатора при отправке формы
const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

// Добавляет обработчик события отправку формы
imgUploadForm.addEventListener('submit', onFormSubmit);

// Добавляет обработчик события на загрузку фото в форму
fileField.addEventListener('change', onFormUploadChange);

// Закрытие по нажатию на кнопку
imgUploadCancelButton.addEventListener('click', onCloseButtonClick);
