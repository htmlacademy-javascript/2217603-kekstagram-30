import { isEscapeKey } from './util.js';

// Ищем образец сообщений в разметке
const messageError = document.querySelector('#error')
  .content.querySelector('.error');
const messageSuccess = document.querySelector('#success')
  .content.querySelector('.success');

// Функция, скрывающая сообщение
const hideMessage = () => {
  const exitMessage = document.querySelector('.success') || document.querySelector('.error');
  exitMessage.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

// Скрытие сообщения при нажатии на кнопку закрытия
const onCloseButtonClick = () => {
  hideMessage();
};

// Скрытие сообщения при нажатии на Esc
function onMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

// Скрытие сообщения при нажатии на область вокруг сообщения
function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }
  hideMessage();
}

// Показ сообщения (любого)
const showMessage = (title, buttonClass) => {
  document.body.append(title);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  title.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
};

// Показ сообщения с ошибкой
const showMessageError = () => {
  showMessage(messageError, '.error__button');
};

// Показ сообщения с успехом
const showMessageSuccess = () => {
  showMessage(messageSuccess, '.success__button');
};

export { showMessageError, showMessageSuccess };
