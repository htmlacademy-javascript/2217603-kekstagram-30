// Список названий эффектов
const Effect = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  DEFAULT: 'none'
};

// Добавляет эффектам стили css
const effectToFilter = {
  [Effect.CHROME]: {
    filter: 'grayscale',
    unit: ''
  },
  [Effect.SEPIA]: {
    filter: 'sepia',
    unit: ''
  },
  [Effect.MARVIN]: {
    filter: 'invert',
    unit: '%'
  },
  [Effect.PHOBOS]: {
    filter: 'blur',
    unit: 'px'
  },
  [Effect.HEAT]: {
    filter: 'brightness',
    unit: ''
  },
  [Effect.DEFAULT]: {
    filter: 'none',
    unit: '%'
  }
};

// Настройки эффектов по тех заданию
const effectToSliderOptions = {
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1
  },
  [Effect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1
  },
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1
  }
};

// Находим разметку
const imgUpload = document.querySelector('.img-upload');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
const effects = imgUpload.querySelector('.effects');
const effectSlider = imgUpload.querySelector('.effect-level__slider');
const effectInputValue = imgUpload.querySelector('.effect-level__value');
const effectLevelContainer = imgUpload.querySelector('.img-upload__effect-level');

// Изначальный эффект по умолчанию
let chosenEffect = Effect.DEFAULT;

// Определяет значение по умолчанию
const isDefault = () => chosenEffect === Effect.DEFAULT;

// Установка нужного эффекта на превью
const setImageStyle = () => {
  if (isDefault()) {
    imgUploadPreview.style.filter = null;
    return;
  }
  const { value } = effectInputValue;
  const { filter, unit } = effectToFilter[chosenEffect];
  imgUploadPreview.style.filter = `${filter}(${value}${unit})`;
};

// Функция показа слайдера
const showSlider = () => {
  effectLevelContainer.classList.remove('hidden');
};

// Функция скрытия слайдера
const hideSlider = () => {
  effectLevelContainer.classList.add('hidden');
};

// Изенение картинки при изменении слайдера
const onSliderUpdate = () => {
  effectInputValue.value = effectSlider.noUiSlider.get();
  setImageStyle();
};

// Создает слайдер
const createSlider = ({ min, max, step }) => {
  noUiSlider.create(effectSlider, {
    range: {
      min,
      max
    },
    start: max,
    step,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    },
  });

  effectSlider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

// Обновление настроек слайдера
const updateSlider = ({ min, max, step }) => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    step,
    start: max
  });
};

// Скрытие слайдера при дефолте и показ измененного при прочих эффектах
const changeSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

// Меняет выбранный эффект
const changeEffect = (effect) => {
  chosenEffect = effect;
  changeSlider();
  setImageStyle();
};

// Сброс эффекта до дефолта
const resetEffect = () => {
  changeEffect(Effect.DEFAULT);
};

// Определяет нажатие на конкретную радиокнопку с эффектом
const onEffectChoose = (evt) => {
  changeEffect(evt.target.value);
};

// Запускает слайдер и эффекты
const initEffect = () => {
  createSlider(effectToSliderOptions[chosenEffect]);
  effects.addEventListener('change', onEffectChoose);
};

export { initEffect, resetEffect };
