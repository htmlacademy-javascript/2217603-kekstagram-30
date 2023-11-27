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

const onCloseButtonClick = () => {
  hideMessage();
};

function onMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }
  hideMessage();
}

const showMessage = (title, buttonClass) => {
  document.body.append(title);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  title.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
};

const showMessageError = () => {
  showMessage(messageError, '.error__button');
};

const showMessageSuccess = () => {
  showMessage(messageSuccess, '.success__button');
};

export { showMessageError, showMessageSuccess };
