'use strict';

(function () {
  var DEBOUNCE_TIME = 500;
  var NEW_PHOTOS_QUANTITY = 10;
  var imgFilter = document.querySelector('.img-filters');
  var imgFilterForm = imgFilter.querySelector('.img-filters__form');
  var imgFilterButton = imgFilter.querySelectorAll('.img-filters__button');

  var changeActiveFilterColor = function (evt) {
    for (var i = 0; i < imgFilterButton.length; i++) {
      if (imgFilterButton[i].classList.contains('img-filters__button--active')) {
        imgFilterButton[i].classList.remove('img-filters__button--active');
      }
    }
    evt.target.classList.add('img-filters__button--active');
  };

  var getRank = function (left, right) {
    return right.comments.length - left.comments.length;
  };

  var onFilterButtonClick = function (evt, filters) {
    changeActiveFilterColor(evt);
    window.util.debounce(filters[evt.target.id], window.gallery.getPhotosData(), DEBOUNCE_TIME);
  };

  var changeFilters = {
    'filter-popular': function (data) {
      window.gallery.refreshPhotos(data);
    },

    'filter-new': function (data) {
      var numberOfPhotos = data.length < NEW_PHOTOS_QUANTITY ? data.length : NEW_PHOTOS_QUANTITY;
      var photos = [];

      for (var i = 0; i < numberOfPhotos; i++) {
        var index = window.util.getRandomNumber(0, data.length - 1);
        photos[i] = data[index];
        data.splice(index, 1);
      }
      window.gallery.refreshPhotos(photos);
    },

    'filter-discussed': function (data) {
      window.gallery.refreshPhotos(data.sort(getRank));
    }
  };
  imgFilter.classList.remove('img-filters--inactive');
  imgFilterForm.classList.add('hidden');
  imgFilterForm.addEventListener('click', function (evt) {
    onFilterButtonClick(evt, changeFilters);
  });
})();
