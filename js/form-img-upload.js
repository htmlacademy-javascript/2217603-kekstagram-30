import { isEscapeKey } from './util.js';
import { showMessageError, showMessageSuccess } from './form-message.js';
import { resetScale } from './scale-img.js';
import { initEffect, resetEffect } from './slider-img.js';
import { sendPhoto } from './api.js';

// Исходные данные
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorTexts = {
  INVALID_COUNT: 'Превышено количество хэш-тегов',
  NOT_UNIQUE: 'Хэш-теги повторяются',
  INVALID_REGEXP: 'Введён невалидный хэш-тег',
};

// Текст кнопки отправки формы, для предотвращения многократных отправок
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

// Ищем нужную разметку, форму, кнопку закрытия, инпуты
const bodyContainer = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const fileField = document.querySelector('.img-upload__input');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

// Создаем начальные настройки для пристин
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Открытие формы редактирования загруженного фото
const showEditingForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
};

// Закрытие формы редактирования фото
const hideEditingForm = () => {
  imgUploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  imgUploadOverlay.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
};

// Если фокус находится в поле ввода хэш-тега, отменяет закрытие при нажатии на Esc.
const isFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

// Проверяет наличие окна с ошибкой для предотвращения закрытия Esc
const isErrorMessageExists = () => Boolean(document.querySelector('.error'));

// Функция, закрывающая окно при нажатии Esc, кроме определенных случаев
function onFormEscKeydown(evt) {
  if (isEscapeKey(evt) && !isFieldFocused() && !isErrorMessageExists()) {
    evt.preventDefault();
    hideEditingForm();
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
  ErrorTexts.INVALID_REGEXP,
  1,
  true
);

// Валидация по количеству хэштегов за раз
pristine.addValidator(
  hashtagField,
  checkHashtagListLength,
  ErrorTexts.INVALID_COUNT,
  2,
  true
);

// Валидация на уникальность хэштега
pristine.addValidator(
  hashtagField,
  checkUniqueHashtags,
  ErrorTexts.NOT_UNIQUE,
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
  hideEditingForm();
};

// Открытие формы редактирования после загрузки изображения
const onFormUploadChange = () => {
  showEditingForm();
};

// Блокировка и разблокировка кнопки отправки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// При отправке формы - запуск валидатора, отправка на сервер
const onFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendPhoto(new FormData(evt.target))
        .then(onSuccess)
        .then(showMessageSuccess)
        .catch(
          (err) => {
            showMessageError(err.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

// Добавляет обработчик события на загрузку фото в форму
fileField.addEventListener('change', onFormUploadChange);

// Закрытие по нажатию на кнопку
imgUploadCancelButton.addEventListener('click', onCloseButtonClick);

// Запуск эффектов
initEffect();

export { onFormSubmit, hideEditingForm };
