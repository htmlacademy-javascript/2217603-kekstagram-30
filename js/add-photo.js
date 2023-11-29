// Возможные типы файлов
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// Находит нужную разметку
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadFile = imgUploadForm.querySelector('.img-upload__input');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effetcsPreview = imgUploadForm.querySelectorAll('.effects__preview');

// Проверка по типу загруженного файла
const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

// Загрузка нужного фото
const onFileInputChange = () => {
  const file = imgUploadFile.files[0];
  if (file && isValidType(file)) {
    imgUploadPreview.src = URL.createObjectURL(file);
    effetcsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${imgUploadPreview.src}')`;
    });
  }
};

export { onFileInputChange };
