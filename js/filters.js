'use strict';

(function () {

  var imgFilter = document.querySelector('.img-filters');
  var imgFilterForm = imgFilter.querySelector('.img-filters__form');
  var imgFilterButton = imgFilter.querySelectorAll('.img-filters__button');
  var pictures = document.querySelector('.pictures');
  var debounceTime = 500;

  var deletePhoto = function () {
    var picturePhotos = pictures.querySelectorAll('.picture');
    for (var i = 0; i < picturePhotos.length; i++) {
      picturePhotos[i].parentNode.removeChild(picturePhotos[i]);
    }
  };

  var changeColorActiveFilterButton = function (evt) {
    for (var i = 0; i < imgFilterButton.length; i++) {
      if (imgFilterButton[i].classList[1] === 'img-filters__button--active') {
        imgFilterButton[i].classList.remove('img-filters__button--active');
      }
    }
    evt.target.classList.add('img-filters__button--active');
  };

  var getRank = function (left, right) {
    return right.comments.length - left.comments.length;
  };

  var onFilterButtonClick = function (evt, filters) {
    changeColorActiveFilterButton(evt);
    filters[evt.target.id](window.gallery.photosDataOld);
  };

  var changeFilters = {
    'filter-popular': function (data) {
      deletePhoto();
      window.util.debounce(data, debounceTime, window.gallery.debounceFunction);
    },

    'filter-new': function (data) {
      var numberOfPhotos = 10;
      var photo = data.slice();
      var photoNew = [];

      if (photo.length < 10) {
        numberOfPhotos = photo.length;
      }

      for (var i = 0; i < numberOfPhotos; i++) {
        var index = window.util.getRandomNumber(0, photo.length - 1);
        photoNew[i] = photo[index];
        photo.splice(index, 1);
      }
      deletePhoto();
      window.util.debounce(photoNew, debounceTime, window.gallery.debounceFunction);
    },

    'filter-discussed': function (data) {
      deletePhoto();
      window.util.debounce(data.slice().sort(getRank), debounceTime, window.gallery.debounceFunction);
    }
  };
  imgFilter.classList.remove('img-filters--inactive');
  imgFilterForm.addEventListener('click', function (evt) {
    onFilterButtonClick(evt, changeFilters);
  });
})();
