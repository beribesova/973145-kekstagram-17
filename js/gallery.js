'use strict';

(function () {
  var kekstagramPhotoTemplate = document.querySelector('#picture').content;
  var pictures = document.querySelector('.pictures');
  var data = [];

  var deletePhoto = function () {
    var picturePhotos = pictures.querySelectorAll('.picture');
    for (var i = 0; i < picturePhotos.length; i++) {
      picturePhotos[i].parentNode.removeChild(picturePhotos[i]);
    }
  };

  var getPhotoListElement = function () {
    var photoListElement = document.querySelector('.pictures');
    return photoListElement;
  };

  var renderPhoto = function (photo) {
    var kekstagramElement = kekstagramPhotoTemplate.cloneNode(true);
    kekstagramElement.querySelector('img').src = photo.url;
    kekstagramElement.querySelector('.picture__likes').textContent = photo.likes;
    kekstagramElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return kekstagramElement;
  };

  var createPhoto = function (fragment, photos) {
    fragment.appendChild(renderPhoto(photos));
  };

  var successHandler = function (photosData) {
    data = photosData.slice();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosData.length; i++) {
      createPhoto(fragment, photosData[i]);
    }
    getPhotoListElement().appendChild(fragment);
    getPhotosData(data);
  };

  var getPhotosData = function () {
    return data.slice();
  };

  var createPhotosFragment = function (photosData) {
    var fragmentNew = document.createDocumentFragment();
    for (var i = 0; i < photosData.length; i++) {
      createPhoto(fragmentNew, photosData[i]);
    }
    getPhotoListElement().appendChild(fragmentNew);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
  window.gallery = {
    errorHandler: errorHandler,
    createPhotosFragment: createPhotosFragment,
    deletePhoto: deletePhoto,
    getPhotosData: getPhotosData
  };
})();
