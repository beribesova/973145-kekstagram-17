'use strict';
(function () {
  var textHashtags = document.querySelector('.text__hashtags');
  var commentsInput = document.querySelector('.text__description');

  var isValidLenght = function (hashtag) {
    return hashtag.length > 0;
  };

  var onHashtagInputChange = function () {
    if (textHashtags.value.length > 0) {
      var hashtags = textHashtags.value.toLowerCase().split(' ');
      validateHashtags(hashtags.filter(isValidLenght));
    } else {
      textHashtags.setCustomValidity('');
      textHashtags.style.border = '';
    }
  };

  var highlightInvalidField = function (reset) {
    textHashtags.style.border = '3px solid red';
    if (reset) {
      textHashtags.style.border = '';
    }
  };

  var isInvalidQuantity = function (hashtags) {
    return hashtags.length > 5;
  };

  var validateHashtags = function (hashtags) {
    var uniqueHashtags = [];
    var validationErrors = '';

    if (isInvalidQuantity(hashtags)) {
      validationErrors += 'Не больше 5ти хэштегов; ';
    }

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      if (hashtag[0] !== '#') {
        validationErrors += 'Хэштэг должен начинаться с символа #; ';
      } else if (hashtag.indexOf('#', 1) > 0) {
        validationErrors += 'Хэштэги должны разделяться пробелом; ';
      } else if (hashtag.length < 2) {
        validationErrors += 'Хэштэг не может быть пустым; ';
      } else if (hashtag.length > 20) {
        validationErrors += 'Длина одного хэштега не должна превышать 20 символов; ';
      } else if (uniqueHashtags.indexOf(hashtag) !== -1) {
        validationErrors += 'Хэштэги повторяются; ';
      }
      uniqueHashtags.push(hashtag);
    }
    highlightInvalidField(validationErrors === '');
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
