'use strict';
(function () {
  var COMMENTS_LENGHT = 5;
  var COMMENT_IMAGE_SIZE = '35';
  var body = document.body;
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img');
  var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var lastRenderedCommentIdx = 0;
  var pictureData;

  var getComments = function (photos, quantity, remainingCommentsQuantity) {
    var comments = [];
    for (var i = quantity; i < quantity + remainingCommentsQuantity; i++) {
      var comment = document.createElement('li');
      comment.classList.add('social__comment');
      var commentImage = document.createElement('img');
      commentImage.classList.add('social__picture');
      commentImage.src = photos.comments[i].avatar;
      commentImage.alt = photos.comments[i].name;
      commentImage.width = COMMENT_IMAGE_SIZE;
      commentImage.height = COMMENT_IMAGE_SIZE;
      comment.appendChild(commentImage);
      var commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentText.textContent = photos.comments[i].message;
      comment.appendChild(commentText);
      comments.push(comment);
    }
    return comments;
  };

  var onPopupEscapePress = function (evt) {
    window.util.onEscapePress(evt, closeBigPicture);
  };

  var onPopupEnterPress = function (evt) {
    window.util.onEnterPress(evt, closeBigPicture);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    bigPictureCancel.removeEventListener('keydown', onPopupEnterPress);
    document.removeEventListener('keydown', onPopupEscapePress);
    pictures.addEventListener('click', onPicturesClick);
    commentsLoader.removeEventListener('click', onLoaderClick);
  };

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    bigPictureCancel.addEventListener('click', closeBigPicture);
    bigPictureCancel.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscapePress);
    commentsLoader.addEventListener('click', onLoaderClick);
  };

  var renderComments = function (data) {
    var remainingCommentsQuantity = window.util.getValueInRange(data.comments.length - lastRenderedCommentIdx, 0, COMMENTS_LENGHT);
    var comments = getComments(data, lastRenderedCommentIdx, remainingCommentsQuantity);
    var fragment = document.createDocumentFragment();

    comments.forEach(function (element) {
      fragment.appendChild(element);
    });
    lastRenderedCommentIdx += remainingCommentsQuantity;
    if (lastRenderedCommentIdx === data.comments.length) {
      commentsLoader.classList.add('hidden');
    }
    bigPicture.querySelector('.social__comments').appendChild(fragment);
    bigPicture.querySelector('.social__comment-count').innerHTML = lastRenderedCommentIdx + ' из <span class="comments-count">' + data.comments.length + '</span> комментариев';
  };

  var onLoaderClick = function () {
    renderComments(pictureData);
  };

  var setBigPicture = function (imgSrc, data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].url === imgSrc) {
        pictureData = data[i];
        bigPictureImage.querySelector('img').src = pictureData.url;
        bigPicture.querySelector('.social__comments').innerHTML = '';
        if (commentsLoader.classList.contains('social__comments-loader')) {
          commentsLoader.classList.remove('visually-hidden');
        }
        lastRenderedCommentIdx = 0;
        renderComments(pictureData);
        bigPictureSocial.querySelector('.social__caption').textContent = data[i].description;
        bigPictureSocial.querySelector('.likes-count').textContent = data[i].likes;
      }
    }
  };

  var onPicturesClick = function (evt) {
    var data = window.gallery.getPhotosData();
    if (evt.target.tagName === 'IMG') {
      var imgSrc = evt.target.parentNode.querySelector('img').getAttribute('src');
      setBigPicture(imgSrc, data);
      openBigPicture();
      pictures.removeEventListener('click', onPicturesClick);
    }
  };
  pictures.addEventListener('click', onPicturesClick);
})();
