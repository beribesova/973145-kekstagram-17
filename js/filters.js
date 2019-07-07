'use strict';

(function () {

  var imgFilter = document.querySelector('.img-filters');
  var imgFilterForm = imgFilter.querySelector('.img-filters__form');
  var imgFilterButton = imgFilter.querySelectorAll('.img-filters__button');
  var debounceTime = 500;

  var changeActiveFilterColor = function (evt) {
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
    changeActiveFilterColor(evt);
    filters[evt.target.id](window.gallery.getPhotosData());
  };

  var changeFilters = {
    'filter-popular': function (data) {
      window.gallery.deletePhoto();
      window.util.debounce(window.gallery.createPhotosFragment, data, debounceTime);
    },

    'filter-new': function (data) {
      var numberOfPhotos = 10;
      var photo = data;
      var photoNew = [];

      if (photo.length < 10) {
        numberOfPhotos = photo.length;
      }

      for (var i = 0; i < numberOfPhotos; i++) {
        var index = window.util.getRandomNumber(0, photo.length - 1);
        photoNew[i] = photo[index];
        photo.splice(index, 1);
      }
      window.gallery.deletePhoto();
      window.util.debounce(window.gallery.createPhotosFragment, photoNew, debounceTime);
    },

    'filter-discussed': function (data) {
      window.gallery.deletePhoto();
      window.util.debounce(window.gallery.createPhotosFragment, data.sort(getRank), debounceTime);
    }
  };
  imgFilter.classList.remove('img-filters--inactive');
  imgFilterForm.addEventListener('click', function (evt) {
    onFilterButtonClick(evt, changeFilters);
  });
})();
