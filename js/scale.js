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
    window.scale.percentScale = parseInt(getScaleValue(), 10);
    if (window.scale.percentScale + SCALE_STEP <= MAX_SCALE) {
      window.scale.percentScale += SCALE_STEP;
    }
    window.scale.editScalePicture(window.scale.percentScale);
  };

  var editScalePictureMinus = function () {
    window.scale.percentScale = parseInt(getScaleValue(), 10);
    if (window.scale.percentScale - SCALE_STEP >= MIN_SCALE) {
      window.scale.percentScale -= SCALE_STEP;
    }
    window.scale.editScalePicture(window.scale.percentScale);
  };

  var editScalePicture = function (percentScale) {
    scalePictureValue.setAttribute('value', percentScale + '%');
    imagePreview.style.transform = 'scale(' + percentScale / MAX_SCALE + ')';
  };

  scalePicturePlus.addEventListener('click', editScalePicturePlus);
  scalePictureMinus.addEventListener('click', editScalePictureMinus);

  window.scale = {
    percentScale: MAX_SCALE,
    editScalePicture: editScalePicture
  };
  window.scale.editScalePicture(window.scale.percentScale);
})();
