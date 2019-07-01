'use strict';

(function () {

  var imgFilter = document.querySelector('.img-filters');
  var imgFilterForm = imgFilter.querySelector('.img-filters__form');
  var imgFilterButton = imgFilter.querySelectorAll('.img-filters__button');
  var pictures = document.querySelector('.pictures');

  var deletePhoto = function () {
    var picturesPhoto = pictures.querySelectorAll('.picture');
    for (var i = 0; i < picturesPhoto.length; i++) {
      picturesPhoto[i].parentNode.removeChild(picturesPhoto[i]);
    }
  };

  var activeFilterButton = function (evt) {
    for (var i = 0; i < imgFilterButton.length; i++) {
      if (imgFilterButton[i].classList[1] === 'img-filters__button--active') {
        imgFilterButton[i].classList.remove('img-filters__button--active');
      }
    }
    evt.target.classList.add('img-filters__button--active');
  };

  var getRank = function (left, right) {
    var value = 0;
    if (left.comments.length < right.comments.length) {
      value = 1;
    } else if (left.comments.length > right.comments.length) {
      value = -1;
    } else if (left.comments.length === right.comments.length) {
      value = 0;
    }
    return value;
  };

  var onClickFilterButton = function (evt) {
    activeFilterButton(evt);
    if (evt.target.id === 'filter-new') {
      filters.filterNewPhotos(window.picture.photosDataOld);
    } else if (evt.target.id === 'filter-popular') {
      filters.filterPopular(window.picture.photosDataOld);
    } else if (evt.target.id === 'filter-discussed') {
      filters.filterDiscussed(window.picture.photosDataOld
        .slice()
        .sort(getRank)
      );
    }
  };

  var filters = {
    filterPopular: function (data) {
      deletePhoto();
      window.debounce(data);
    },

    filterNewPhotos: function (data) {
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
      window.debounce(photoNew);
    },

    filterDiscussed: function (data) {
      deletePhoto();
      window.debounce(data);
    }
  };
  imgFilter.classList.remove('img-filters--inactive');
  imgFilterForm.addEventListener('click', function (evt) {
    onClickFilterButton(evt);
  });
})();
