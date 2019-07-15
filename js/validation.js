'use strict';
(function () {
  var textHashtags = document.querySelector('.text__hashtags');
  var commentsInput = document.querySelector('.text__description');

  var renderArraySplit = function () {
    var hashtagArray = [];
    if (textHashtags.value.length > 0) {
      hashtagArray = textHashtags.value.toLowerCase().split(' ');
      validityInputHashtag(hashtagArray);
    } else {
      textHashtags.setCustomValidity('');
      textHashtags.style.border = '';
    }
  };

  var errorHashtag = function () {
    textHashtags.style.border = '3px solid red';
  };

  var validityInputHashtag = function (arrayHashteg) {
    var hashtegArr = arrayHashteg;
    var searchDouble = [];

    for (var i = 0; i < hashtegArr.length; i++) {
      if (hashtegArr[i].length < 3) {
        textHashtags.setCustomValidity('Хэштэг должен состоять как минимум из 3х символов');
        errorHashtag();
      } else if (hashtegArr[i][0] !== '#') {
        textHashtags.setCustomValidity('Хэштэг должен начинаться с символа #');
        errorHashtag();
      } else if (hashtegArr[i].indexOf('#', 1) > 0) {
        textHashtags.setCustomValidity('Хэштэги должны разделяться пробелом');
        errorHashtag();
      } else if (i >= 5) {
        textHashtags.setCustomValidity('Не больше 5ти хэштегов');
        errorHashtag();
      } else if (hashtegArr[i].length > 20) {
        textHashtags.setCustomValidity('Длина одного хэштега не должна превышать 20 символов');
        errorHashtag();
      } else if (searchDouble.indexOf(hashtegArr[i]) !== -1) {
        textHashtags.setCustomValidity('Хэштэги повторяются');
        errorHashtag();
      } else {
        textHashtags.setCustomValidity('');
        textHashtags.style.border = '';
      }
      searchDouble.push(hashtegArr[i]);
    }
  };

  var onTextComment = function () {
    if (commentsInput.value.length > 140) {
      commentsInput.setCustomValidity('Комментарий не должен превышать 140 символов');
      commentsInput.style.border = '3px solid red';
    } else {
      commentsInput.style.border = '';
    }
  };
  textHashtags.addEventListener('input', renderArraySplit);
  commentsInput.addEventListener('input', onTextComment);
})();
