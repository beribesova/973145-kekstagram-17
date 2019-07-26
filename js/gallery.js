'use strict';

(function () {
  var kekstagramPhotoTemplate = document.querySelector('#picture').content;
  var pictures = document.querySelector('.pictures');
  var imgFilterForm = document.querySelector('.img-filters__form');
  var data = [];

  var deletePhoto = function () {
    var picturePhotos = pictures.querySelectorAll('.picture');
    picturePhotos.forEach(function (picture) {
      picture.parentNode.removeChild(picture);
    });
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

  var onSuccess = function (photosData) {
    data = photosData;
    createPhotosFragment(photosData);
    imgFilterForm.classList.remove('hidden');
  };

  var getPhotosData = function () {
    return data.slice();
  };

  var refreshPhotos = function (photosData) {
    deletePhoto();
    createPhotosFragment(photosData);
  };

  var createPhotosFragment = function (photosData) {
    var fragment = document.createDocumentFragment();
    photosData.forEach(function (photoData) {
      createPhoto(fragment, photoData);
    });

    getPhotoListElement().appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccess, onError);
  window.gallery = {
    getPhotosData: getPhotosData,
    refreshPhotos: refreshPhotos
  };
})();
