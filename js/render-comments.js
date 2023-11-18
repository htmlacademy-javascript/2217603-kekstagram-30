// Находим родителя для будущих комментов и шаблон
const commentContainer = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');

// Создаем один коммент по образцу
const renderComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

// Очищаем список и создаем комменты из предлагаемого массива
const renderComments = (commentsArray) => {
  commentContainer.innerHTML = '';
  const commentFragment = document.createDocumentFragment();
  commentsArray.forEach((commentItem) => {
    const comments = renderComment(commentItem);
    commentFragment.append(comments);
  });
  commentContainer.append(commentFragment);
};

export { renderComments };
