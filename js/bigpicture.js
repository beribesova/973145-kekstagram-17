'use strict';
(function () {

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img');
  var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

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
    pictures.addEventListener('click', onClickPopupSet);
  };

  var onClickPopup = function () {
    bigPicture.classList.remove('hidden');
    bigPictureCancel.addEventListener('click', closeBigPicture);
    bigPictureCancel.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscapePress);
  };

  var setBigPicture = function (evt) {
    for (var i = 0; i < window.dataArray.length; i++) {
      if (window.dataArray[i].url === evt.target.parentNode.querySelector('img').getAttribute('src')) {
        bigPictureImage.querySelector('img').src = window.dataArray[i].url;
        bigPicture.querySelector('.social__comments').innerHTML = '';
        bigPictureSocial.querySelector('.social__caption').textContent = window.dataArray[i].description;
        bigPictureSocial.querySelector('.likes-count').textContent = window.dataArray[i].likes;
      }
    }
  };

  var onClickPopupSet = function (evt) {
    if (evt.target.tagName === 'IMG') {
      setBigPicture(evt);
      onClickPopup();
      pictures.removeEventListener('click', onClickPopupSet);
    }
  };
  socialCommentCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
  pictures.addEventListener('click', onClickPopupSet);
})();

