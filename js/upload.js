'use strict';

(function () {
  var main = document.querySelector('main');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');

  var createPopupMessage = function (templateEvent) {
    var template = templateEvent.cloneNode(true);
    main.appendChild(template);
    template.style.display = 'none';
  };

  createPopupMessage(templateSuccess);
  createPopupMessage(templateError);

  var success = main.querySelector('.success');
  var error = main.querySelector('.error');
  var successBlock = main.querySelector('.success__inner');
  var errorBlock = main.querySelector('.error__inner');
  var successButton = main.querySelector('.success__button');
  var errorButton = main.querySelectorAll('.error__button');

  var hideSuccessBlock = function () {
    success.style.display = 'none';
    document.removeEventListener('keydown', onSuccessBlockEscape);
    document.removeEventListener('click', onOpenSuccessPopup);
  };

  var hideErrorBlock = function () {
    error.style.display = 'none';
    document.removeEventListener('keydown', onErrorBlockEscape);
    document.removeEventListener('click', onOpenErrorPopup);
  };

  var onSuccessBlockEscape = function (evt) {
    window.util.onEscapePress(evt, hideSuccessBlock);
  };

  var onErrorBlockEscape = function (evt) {
    window.util.onEscapePress(evt, hideErrorBlock);
  };

  var onOpenSuccessPopup = function (evt) {
    var isClickInside = successBlock.contains(evt.target);
    if (!isClickInside) {
      hideSuccessBlock();
    }
  };

  var onOpenErrorPopup = function (evt) {
    var isClickInside = errorBlock .contains(evt.target);
    if (!isClickInside) {
      hideErrorBlock();
    }
  };

  var showSuccessPopup = function () {
    success.style.display = 'flex';
    document.addEventListener('click', onOpenSuccessPopup);
  };

  var showErrorPopup = function () {
    error.style.display = 'flex';
    document.addEventListener('click', onOpenErrorPopup);
  };

  successButton.addEventListener('click', hideSuccessBlock);
  Array.from(errorButton).forEach(function (item) {
    item.addEventListener('click', hideErrorBlock);
  });
  document.addEventListener('keydown', onSuccessBlockEscape);
  document.addEventListener('keydown', onErrorBlockEscape);

  window.upload = {
    showSuccessPopup: showSuccessPopup,
    showErrorPopup: showErrorPopup
  };
})();
