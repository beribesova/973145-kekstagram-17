'use strict';
(function () {

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img');
  var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var quantityComments = 0;
  var arrayIndex = 0;
  var COMMENTS_LENGHT = 5;

  var setComments = function (photos) {
    var commentsArray = [];
    for (var i = 0; i < photos.comments.length; i++) {
      var comment = document.createElement('li');
      comment.classList.add('social__comment');
      comment.classList.add('social__comment--text');
      var commentImage = document.createElement('img');
      commentImage.classList.add('social__picture');
      commentImage.src = photos.comments[i].avatar;
      commentImage.alt = photos.comments[i].name;
      commentImage.width = '35';
      commentImage.height = '35';
      comment.appendChild(commentImage);
      var commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentText.textContent = photos.comments[i].message;
      comment.appendChild(commentText);
      commentsArray[i] = comment;
    }
    return commentsArray;
  };

  var onPopupEscapePress = function (evt) {
    window.util.onEscapePress(evt, closeBigPicture);
  };

  var onPopupEnterPress = function (evt) {
    window.util.onEnterPress(evt, closeBigPicture);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    bigPictureCancel.removeEventListener('keydown', onPopupEnterPress);
    document.removeEventListener('keydown', onPopupEscapePress);
    pictures.addEventListener('click', onClickPictures);
    commentsLoader.removeEventListener('click', onClickLoader);
  };

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    bigPictureCancel.addEventListener('click', closeBigPicture);
    bigPictureCancel.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscapePress);
    commentsLoader.addEventListener('click', onClickLoader);
  };

  var renderComments = function (data) {
    var commentsArray = setComments(data);
    var fragment = document.createDocumentFragment();
    var commentAdd = window.util.getValueInRange(commentsArray.length - quantityComments, 0, COMMENTS_LENGHT);
    for (var i = quantityComments; i < commentAdd + quantityComments; i++) {
      fragment.appendChild(commentsArray[i]);
    }
    quantityComments += commentAdd;
    if (quantityComments === commentsArray.length) {
      commentsLoader.classList.add('visually-hidden');
    }
    bigPicture.querySelector('.social__comments').appendChild(fragment);
    bigPicture.querySelector('.social__comment-count').innerHTML = quantityComments + ' из <span class="comments-count">' + data.comments.length + '</span> комментариев';
  };

  var onClickLoader = function () {
    var data = window.gallery.getPhotosData();
    renderComments(data[arrayIndex]);
  };

  var setBigPicture = function (imgSrc, data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].url === imgSrc) {
        bigPictureImage.querySelector('img').src = data[i].url;
        bigPicture.querySelector('.social__comments').innerHTML = '';
        if (commentsLoader.classList.contains('social__comments-loader')) {
          commentsLoader.classList.remove('visually-hidden');
        }
        quantityComments = 0;
        arrayIndex = i;
        renderComments(data[i]);
        bigPictureSocial.querySelector('.social__caption').textContent = data[i].description;
        bigPictureSocial.querySelector('.likes-count').textContent = data[i].likes;
      }
    }
  };

  var onClickPictures = function (evt) {
    var data = window.gallery.getPhotosData();
    if (evt.target.tagName === 'IMG') {
      var imgSrc = evt.target.parentNode.querySelector('img').getAttribute('src');
      setBigPicture(imgSrc, data);
      openBigPicture();
      pictures.removeEventListener('click', onClickPictures);
    }
  };
  pictures.addEventListener('click', onClickPictures);
})();
