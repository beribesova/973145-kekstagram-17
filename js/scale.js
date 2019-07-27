'use strict';

(function () {
  var SCALE_STEP = 25;
  var MIN_SIZE = 25;
  var MAX_SIZE = 100;
  var scalePicture = document.querySelector('.img-upload__scale');
  var scalePictureValue = scalePicture.querySelector('.scale__control--value');
  var scalePictureMinus = scalePicture.querySelector('.scale__control--smaller');
  var scalePicturePlus = scalePicture.querySelector('.scale__control--bigger');
  var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');

  var getScaleValue = function () {
    return scalePictureValue.value.slice(0, -1);
  };

  var onIncreasePictureScaleClick = function () {
    var percentScale = parseInt(getScaleValue(), 10);
    if (percentScale + SCALE_STEP <= MAX_SIZE) {
      percentScale += SCALE_STEP;
    }
    editPictureSize(percentScale);
  };

  var onDecreasePictureScaleClick = function () {
    var percentScale = parseInt(getScaleValue(), 10);
    if (percentScale - SCALE_STEP >= MIN_SIZE) {
      percentScale -= SCALE_STEP;
    }
    editPictureSize(percentScale);
  };

  var editPictureSize = function (percentScale) {
    scalePictureValue.setAttribute('value', percentScale + '%');
    imagePreview.style.transform = 'scale(' + percentScale / MAX_SIZE + ')';
  };

  scalePicturePlus.addEventListener('click', onIncreasePictureScaleClick);
  scalePictureMinus.addEventListener('click', onDecreasePictureScaleClick);
  editPictureSize(MAX_SIZE);

  window.scale = {
    editPictureSize: editPictureSize,
    MAX_SIZE: MAX_SIZE
  };
})();
