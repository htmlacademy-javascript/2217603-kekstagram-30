// Изначальные данные
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

// Нужная разметка
const imgUpload = document.querySelector('.img-upload');
const scaleControlSmallerButton = imgUpload.querySelector('.scale__control--smaller');
const scaleControBiggerButton = imgUpload.querySelector('.scale__control--bigger');
const scaleControlInput = imgUpload.querySelector('.scale__control--value');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');

// Масштабирует изображение и передает данные в инпут
const scaleImage = (value) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleControlInput.value = `${value}%`;
};

// Нажатие на кнопку уменьшения
const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleControlInput.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

// Нажатие на кнопку увеличения
const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleControlInput.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

// Сброс масштабирования до дефолта
const resetScale = () => scaleImage(DEFAULT_SCALE);

// Добавляет слушатель событий на кнопки масштабирования
scaleControlSmallerButton.addEventListener('click', onSmallerButtonClick);
scaleControBiggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };
