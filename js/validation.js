'use strict';
(function () {
  var textHashtags = document.querySelector('.text__hashtags');
  var commentsInput = document.querySelector('.text__description');

  var onHashtagInputChange = function () {
    if (textHashtags.value.length > 0) {
      var hashtags = textHashtags.value.toLowerCase().split(' ');
      validateHashtags(hashtags);
    } else {
      textHashtags.setCustomValidity('');
      textHashtags.style.border = '';
    }
  };

  var highlightInvalidField = function () {
    textHashtags.style.border = '3px solid red';
  };

  var hashtagFiltering = function (hashtag) {
    return hashtag.length >= 1;
  };

  var isValidQuantity = function (hashtagArray) {
    return hashtagArray.length > 5;
  };

  var validateHashtags = function (hashtagArray) {
    var uniqueHashtags = [];
    var validationErrors = '';
    var hashtags = hashtagArray.filter(hashtagFiltering);

    if (isValidQuantity(hashtags) === true) {
      validationErrors += 'Не больше 5ти хэштегов\n';
    }

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      if (hashtag[0] !== '#' && hashtag.length > 0) {
        validationErrors += 'Хэштэг должен начинаться с символа #\n';
      } else if (hashtag.indexOf('#', 1) > 0) {
        validationErrors += 'Хэштэги должны разделяться пробелом\n';
      } else if (hashtag.length > 0 && hashtag.length < 2) {
        validationErrors += 'Хэштэг не может быть пустым\n';
      } else if (hashtag.length > 20) {
        validationErrors += 'Длина одного хэштега не должна превышать 20 символов\n';
      } else if (uniqueHashtags.indexOf(hashtag) !== -1) {
        validationErrors += 'Хэштэги повторяются\n';
      } else {
        textHashtags.style.border = '';
      }
      uniqueHashtags.push(hashtag);
    }
    if (validationErrors !== '') {
      highlightInvalidField();
    }
    textHashtags.setCustomValidity(validationErrors);
  };

  var onCommentInputChange = function () {
    if (commentsInput.value.length > 140) {
      commentsInput.setCustomValidity('Комментарий не должен превышать 140 символов');
      commentsInput.style.border = '3px solid red';
    } else {
      commentsInput.setCustomValidity('');
      commentsInput.style.border = '';
    }
  };
  textHashtags.addEventListener('input', onHashtagInputChange);
  commentsInput.addEventListener('input', onCommentInputChange);
})();
