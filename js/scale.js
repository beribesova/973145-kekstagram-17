'use strict';

(function () {
  var scalePicture = document.querySelector('.img-upload__scale');
  var scalePictureValue = scalePicture.querySelector('.scale__control--value');
  var scalePictureMinus = scalePicture.querySelector('.scale__control--smaller');
  var scalePicturePlus = scalePicture.querySelector('.scale__control--bigger');
  var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
  var SCALE_STEP = 25;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;

  var getScaleValue = function () {
    return scalePictureValue.value.slice(0, -1);
  };

  var editScalePicturePlus = function () {
    var percentScale = parseInt(getScaleValue(), 10);
    if (percentScale + SCALE_STEP <= MAX_SCALE) {
      percentScale += SCALE_STEP;
    }
    window.scale.editScalePicture(percentScale);
  };

  var editScalePictureMinus = function () {
    var percentScale = parseInt(getScaleValue(), 10);
    if (percentScale - SCALE_STEP >= MIN_SCALE) {
      percentScale -= SCALE_STEP;
    }
    window.scale.editScalePicture(percentScale);
  };

  var editScalePicture = function (percentScale) {
    scalePictureValue.setAttribute('value', percentScale + '%');
    imagePreview.style.transform = 'scale(' + percentScale / MAX_SCALE + ')';
  };

  scalePicturePlus.addEventListener('click', editScalePicturePlus);
  scalePictureMinus.addEventListener('click', editScalePictureMinus);
  editScalePicture(MAX_SCALE);

  window.scale = {
    editScalePicture: editScalePicture
  };
})();
