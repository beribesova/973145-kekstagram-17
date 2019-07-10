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
    pictures.addEventListener('click', onClickPictures);
  };

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    bigPictureCancel.addEventListener('click', closeBigPicture);
    bigPictureCancel.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscapePress);
  };

  var setBigPicture = function (imgSrc, data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].url === imgSrc) {
        bigPictureImage.querySelector('img').src = data[i].url;
        bigPicture.querySelector('.social__comments').innerHTML = '';
        bigPictureSocial.querySelector('.social__caption').textContent = data[i].description;
        bigPictureSocial.querySelector('.likes-count').textContent = data[i].likes;
      }
    }
  };

  var onClickPictures = function (evt) {
    var data = window.gallery.getPhotosData();
    if (evt.target.tagName === 'IMG') {
      var imgSrc = evt.target.parentNode.querySelector('img').getAttribute('src')
      setBigPicture(imgSrc, data);
      openBigPicture();
      pictures.removeEventListener('click', onClickPictures);
    }
  };
  socialCommentCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
  pictures.addEventListener('click', onClickPictures);
})();
