'use strict';
(function () {
  var textHashtags = document.querySelector('.text__hashtags');
  var commentsInput = document.querySelector('.text__description');

  var onHashtagInputChange = function () {
    var hashtags = [];
    if (textHashtags.value.length > 0) {
      hashtags = textHashtags.value.toLowerCase().split(' ');
      validateHashtags(hashtags);
    } else {
      textHashtags.setCustomValidity('');
      textHashtags.style.border = '';
    }
  };

  var highlightsInvalidField = function () {
    textHashtags.style.border = '3px solid red';
  };

  var checkQuantity = function (hashtagArray) {
    if (hashtagArray.length > 5) {
      return true;
    }
    return false;
  };

  var validateHashtags = function (hashtags) {
    var uniqueHashtags = [];
    var validationErrors = '';
    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      if (hashtag[0] !== '#') {
        validationErrors += 'Хэштэг должен начинаться с символа #\n';
      } else if (hashtag.indexOf('#', 1) > 0) {
        validationErrors += 'Хэштэги должны разделяться пробелом\n';
      } else if (hashtag.length < 2) {
        validationErrors += 'Хэштэг не может быть пустым\n';
      } else if (checkQuantity(hashtags) === true) {
        textHashtags.setCustomValidity('Не больше 5ти хэштегов\n');
      } else if (hashtag.length > 20) {
        validationErrors += 'Длина одного хэштега не должна превышать 20 символов\n';
      } else if (uniqueHashtags.indexOf(hashtag) !== -1) {
        validationErrors += 'Хэштэги повторяются\n';
      } else {
        textHashtags.setCustomValidity('');
        textHashtags.style.border = '';
      }
      if (validationErrors !== '') {
        textHashtags.setCustomValidity(validationErrors);
        highlightsInvalidField();
      }
      uniqueHashtags.push(hashtag);
    }
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
