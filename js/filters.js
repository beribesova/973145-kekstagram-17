'use strict';

(function () {
  var pictures = document.querySelector('.pictures');

  var deletePhoto = function () {
    var picturePhotos = pictures.querySelectorAll('.picture');
    for (var i = 0; i < picturePhotos.length; i++) {
      picturePhotos[i].parentNode.removeChild(picturePhotos[i]);
    }
  };

  var getRank = function (left, right) {
    return right.comments.length - left.comments.length;
  };

  var changeFilters = {
    'filter-popular': function (data) {
      deletePhoto();
      return data;
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
      return photoNew;
    },

    'filter-discussed': function (data) {
      deletePhoto();
      return data.slice().sort(getRank);
    }
  };

  var sortPhoto = function (data, filter) {
    return changeFilters[filter](data);
  };

  window.filters = {
    sortPhoto: sortPhoto
  };
})();
