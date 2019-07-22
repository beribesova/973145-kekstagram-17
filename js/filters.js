'use strict';

(function () {
  var DEBOUNCE_TIME = 500;
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
      window.gallery.refreshPhotos(data, DEBOUNCE_TIME);
    },

    'filter-new': function (data) {
      var numberOfPhotos = data.length < 10 ? data.length : 10;
      var photos = [];

      for (var i = 0; i < numberOfPhotos; i++) {
        var index = window.util.getRandomNumber(0, data.length - 1);
        photos[i] = data[index];
        data.splice(index, 1);
      }
      window.gallery.refreshPhotos(photos, DEBOUNCE_TIME);
    },

    'filter-discussed': function (data) {
      window.gallery.refreshPhotos(data.sort(getRank), DEBOUNCE_TIME);
    }
  };
  imgFilter.classList.remove('img-filters--inactive');
  imgFilterForm.classList.add('hidden');
  imgFilterForm.addEventListener('click', function (evt) {
    onFilterButtonClick(evt, changeFilters);
  });
})();
