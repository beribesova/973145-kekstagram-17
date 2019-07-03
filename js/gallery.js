'use strict';

(function () {
  var imgFilter = document.querySelector('.img-filters');
  var imgFilterForm = imgFilter.querySelector('.img-filters__form');
  var imgFilterButton = imgFilter.querySelectorAll('.img-filters__button');
  var debounceTime = 500;

  var kekstagramPhotoTemplate = document.querySelector('#picture').content;
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

  var createPhotosFragment = function (photosData) {
    window.gallery.photosDataOld = photosData.slice();
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

  var changeColorActiveFilterButton = function (evt) {
    for (var i = 0; i < imgFilterButton.length; i++) {
      if (imgFilterButton[i].classList[1] === 'img-filters__button--active') {
        imgFilterButton[i].classList.remove('img-filters__button--active');
      }
    }
    evt.target.classList.add('img-filters__button--active');
  };

  var onFilterButtonClick = function (evt) {
    changeColorActiveFilterButton(evt);
    window.util.debounce(window.filters.sortPhoto(window.gallery.photosDataOld, evt.target.id), debounceTime, createPhotosFragment);
  };

  imgFilter.classList.remove('img-filters--inactive');
  imgFilterForm.addEventListener('click', function (evt) {
    onFilterButtonClick(evt);
  });

  window.backend.load(createPhotosFragment, errorHandler);
  window.gallery = {
    errorHandler: errorHandler,
    createPhotosFragment: createPhotosFragment,
  };
})();
