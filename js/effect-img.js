// Список названий эффектов
const effectList = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  DEFAULT: 'none'
};

// Добавляет эффектам стили css
const effectToFilter = {
  [effectList.CHROME]: {
    filter: 'grayscale',
    unit: ''
  },
  [effectList.SEPIA]: {
    filter: 'sepia',
    unit: ''
  },
  [effectList.MARVIN]: {
    filter: 'invert',
    unit: '%'
  },
  [effectList.PHOBOS]: {
    filter: 'blur',
    unit: 'px'
  },
  [effectList.HEAT]: {
    filter: 'brightness',
    unit: ''
  },
  [effectList.DEFAULT]: {
    filter: 'none',
    unit: '%'
  }
};

// Настройки эффектов по тех заданию
const effectToSliderOptions = {
  [effectList.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [effectList.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [effectList.MARVIN]: {
    min: 0,
    max: 100,
    step: 0.1
  },
  [effectList.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1
  },
  [effectList.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1
  },
  [effectList.DEFAULT]: {
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
let chosenEffect = effectList.DEFAULT;

// Определяет значение по умолчанию
const isDefault = () => chosenEffect === effectList.DEFAULT;

// Установка нужного эффекта на превью
const changeImageStyle = () => {
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
  changeImageStyle();
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
  changeImageStyle();
};

// Сброс эффекта до дефолта
const resetEffect = () => {
  changeEffect(effectList.DEFAULT);
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
