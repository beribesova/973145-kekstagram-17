'use strict';

(function () {
  var scalePicture = document.querySelector('.img-upload__scale');
  var scalePictureValue = scalePicture.querySelector('.scale__control--value');
  var scalePictureMinus = scalePicture.querySelector('.scale__control--smaller');
  var scalePicturePlus = scalePicture.querySelector('.scale__control--bigger');
  var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
  var SCALE_STEP = 25;


  var getScaleValue = function () {
    return scalePictureValue.value.slice(0, -1);
  };

  var scalePictureEditPlus = function () {
    window.scale.percentScale = parseInt(getScaleValue(), 10);
    if (window.scale.percentScale + SCALE_STEP <= 100) {
      window.scale.percentScale += SCALE_STEP;
    }
    window.scale.scalePictureEdit();
  };

  var scalePictureEditMinus = function () {
    window.scale.percentScale = parseInt(getScaleValue(), 10);
    if (window.scale.percentScale - SCALE_STEP >= 25) {
      window.scale.percentScale -= SCALE_STEP;
    }
    window.scale.scalePictureEdit();
  };

  window.scale.scalePictureEdit();
  scalePicturePlus.addEventListener('click', scalePictureEditPlus);
  scalePictureMinus.addEventListener('click', scalePictureEditMinus);

  window.scale = {
    percentScale: 100,
    scalePictureEdit: function () {
      scalePictureValue.setAttribute('value', this.percentScale + '%');
      imagePreview.style.transform = 'scale(' + this.percentScale / 100 + ')';
    }
  };
})();
