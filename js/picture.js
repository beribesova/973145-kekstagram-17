'use strict';

(function () {
  var getRandomComments = function () {
    var requireCount = window.util.getRandomNumber(1, 2);
    var randomComments = '';
    var commentsIdx = [];

    for (var i = 0; i < requireCount; i++) {
      commentsIdx[i] = window.util.getRandomNumber(0, window.data.COMMENTS.length);
    }

    for (i = 0; i < requireCount; i++) {
      if (i === requireCount - 1) {
        randomComments += window.data.COMMENTS[commentsIdx[i]];
      } else {
        randomComments += window.data.COMMENTS[commentsIdx[i]] + '&nbsp;';
      }
    }
    return randomComments;
  };

  var getRandomName = function () {
    return window.data.NAMES[window.util.getRandomNumber(0, window.data.NAMES.length)];
  };

  var getPhotoData = function (photoIdx) {
    var photoData = {
      url: 'photos/' + (photoIdx + 1) + '.jpg',
      likes: window.util.getRandomNumber(15, 200),
      comments: getComments()
    };
    return photoData;
  };

  var getPhotos = function () {
    var photos = [];
    for (var i = 0; i < window.data.COMMENTS_NUMBER; i++) {
      photos[i] = getPhotoData(i);
    }
    return photos;
  };

  var getCommentData = function () {
    var commentData = {
      avatar: 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg',
      message: getRandomComments(),
      name: getRandomName()
    };
    return commentData;
  };

  var getComments = function () {
    var messages = [];
    for (var i = 0; i < window.util.getRandomNumber(1, 5); i++) {
      messages[i] = getCommentData();
    }
    return messages;
  };

  window.picture = {
    getPhotos: getPhotos
  };
})();
