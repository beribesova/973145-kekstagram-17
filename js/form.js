'use strict';

(function () {
  var RESET_PIN_VALUE = 453;
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlayImage = document.querySelector('.img-upload__overlay ');
  var uploadClose = uploadOverlayImage.querySelector('#upload-cancel');
  var slider = document.querySelector('.img-upload__effect-level');
  var uploadImageEffects = document.querySelector('.img-upload__effects ');
  var effectLevelPin = slider.querySelector('.effect-level__pin');
  var effectLevelLine = slider.querySelector('.effect-level__line');
  var effectLevelDepth = slider.querySelector('.effect-level__depth');
  var uploadPreviewImage = document.querySelector('.img-upload__preview img');
  var effectValue = slider.querySelector('.effect-level__value');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var comment = uploadOverlayImage.querySelector('.text__description');
  var noneEffect = document.querySelector('input[value = "none"]');
  var form = document.querySelector('.img-upload__form');
  var MAX_SCALE = 100;

  var onPopupEscapePress = function (evt) {
    window.util.onEscapePress(evt, closePopup);
  };

  var openPopup = function () {
    uploadOverlayImage.classList.remove('hidden');
    noneEffect.checked = true;
    hideSlider('none');
    changeEffect('none');
    applyEffect('none', 0);
    document.addEventListener('keydown', onPopupEscapePress);
  };

  var closePopup = function () {
    uploadOverlayImage.classList.add('hidden');
    applyEffect('none', 0);
    document.removeEventListener('keydown', onPopupEscapePress);
  };

  var calculateValue = function (sliderValue, min, max) {
    if (sliderValue === 0) {
      return min;
    } else {
      return ((max - min) * sliderValue) / 100 + min;
    }
  };

  var applyEffect = function (effectName, sliderValue) {
    switch (effectName) {
      case 'none':
        uploadPreviewImage.style.filter = '';
        break;
      case 'chrome':
        uploadPreviewImage.style.filter = 'grayscale(' + calculateValue(sliderValue, 0, 1) + ')';
        break;
      case 'sepia':
        uploadPreviewImage.style.filter = 'sepia(' + calculateValue(sliderValue, 0, 1) + ')';
        break;
      case 'marvin':
        uploadPreviewImage.style.filter = 'invert(' + calculateValue(sliderValue, 0, 100) + '%)';
        break;
      case 'phobos':
        uploadPreviewImage.style.filter = 'blur(' + calculateValue(sliderValue, 0, 3) + 'px)';
        break;
      case 'heat':
        uploadPreviewImage.style.filter = 'brightness(' + calculateValue(sliderValue, 1, 3) + ')';
        break;
    }

  };

  var changeEffect = function (effectName) {
    uploadPreviewImage.className = '';
    effectValue.classList.remove('hidden');
    uploadPreviewImage.classList.add('effects__preview--' + effectName);

    if (effectName === 'none') {
      effectValue.classList.add('hidden');
    }
  };

  var resetEffect = function (effect) {
    var resetValue = 100;
    effectValue.value = resetValue;
    applyEffect(effect, resetValue);
    setLevelPin(RESET_PIN_VALUE);
  };

  var setLevelPin = function (level) {
    effectLevelPin.style.left = level + 'px';
    effectLevelDepth.style.width = level + 'px';
  };

  var hideSlider = function (effect) {
    if (effect) {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
  };

  var setEffect = function (effectToggle) {
    hideSlider(effectToggle.id === 'effect-none');
    resetEffect(effectToggle.value);
    changeEffect(effectToggle.value);
  };

  var applyPinMove = function (startX, evt, shiftX) {
    var EFFECT_LEVEL_PIN = effectLevelLine.offsetWidth;
    var displacementX = (effectLevelPin.offsetLeft - shiftX);
    displacementX = window.util.getValueInRange(displacementX, 0, EFFECT_LEVEL_PIN);
    var percentValue = window.util.getPercent(evt.target.offsetLeft, EFFECT_LEVEL_PIN);
    effectLevelValue.setAttribute('value', percentValue);
    applyEffect(document.querySelector('input[name = "effect"]:checked').value, percentValue);
    setLevelPin(displacementX);
  };

  comment.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscapePress);
  });

  comment.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscapePress);
  });

  uploadImageEffects.addEventListener('click', function (evt) {
    var effectToggle = evt.target;
    if (effectToggle.localName === 'input') {
      setEffect(effectToggle);
    }
  });

  uploadFile.addEventListener('change', function () {
    openPopup();
    uploadFile.blur();
  });

  uploadClose.addEventListener('click', function () {
    closePopup();
  });

  uploadClose.addEventListener('keydown', function (evt) {
    window.util.onEnterPress(evt, closePopup);
  });

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startX = evt.clientX;
    var onMouseMove = function (moveEvt) {
      var shiftX = startX - moveEvt.clientX;
      startX = moveEvt.clientX;
      applyPinMove(startX, evt, shiftX);
    };

    var onMouseUp = function (upEvt) {
      var shiftX = startX - upEvt.clientX;
      startX = upEvt.clientX;
      applyPinMove(startX, evt, shiftX);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(form);
    window.backend.save(data, closePopup, window.gallery.errorHandler);
    window.scale.editScalePicture(MAX_SCALE);
  });
})();
