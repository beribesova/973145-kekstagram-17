'use strict';

(function () {
  var getPhotoListElement = function () {
    var photoListElement = document.querySelector('.pictures');
    return photoListElement;
  };

  var renderPhoto = function (kekstagramPhotoTemplate, photo) {
    var kekstagramElement = kekstagramPhotoTemplate.cloneNode(true);
    kekstagramElement.querySelector('img').src = photo.url;
    kekstagramElement.querySelector('.picture__likes').textContent = photo.likes;
    kekstagramElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return kekstagramElement;
  };

  var createPhoto = function (fragment, kekstagramPhotoTemplate, photos) {
    fragment.appendChild(renderPhoto(kekstagramPhotoTemplate, photos));
  };

  var successHandler = function (photosData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosData.length; i++) {
      createPhoto(fragment, kekstagramPhotoTemplate, photosData[i]);
    }
    getPhotoListElement().appendChild(fragment);
  };

  window.load(successHandler, window.util.errorHandler);

  var kekstagramPhotoTemplate = document.querySelector('#picture').content;
})();
