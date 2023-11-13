const picturesContainer = document.querySelector('.pictures');
// const picturesTitle = document.querySelector('.pictures__title');
// picturesTitle.classList.remove('visually-hidden'); зачем?
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const pictureFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    pictureFragment.append(thumbnail);
  });
  picturesContainer.append(pictureFragment);
};


export { renderThumbnails };

