'use strict';

(function () {
  var main = document.querySelector('main');
  var successElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

  main.appendChild(successElement);
  main.appendChild(errorElement);
  var success = main.querySelector('.success');
  var error = main.querySelector('.error');
  var successBlock = main.querySelector('.success__inner');
  var errorBlock = main.querySelector('.error__inner');
  var successButton = main.querySelector('.success__button');
  var errorButtonsElement = main.querySelector('.error__buttons');
  success.classList.add('visually-hidden');
  error.classList.add('visually-hidden');

  var hideSuccessBlock = function () {
    success.classList.add('visually-hidden');
    document.removeEventListener('keydown', onSuccessBlockEscape);
    document.removeEventListener('click', onSuccessPopupOutsideClick);
  };

  var hideErrorBlock = function () {
    error.classList.add('visually-hidden');
    document.removeEventListener('keydown', onErrorBlockEscape);
    document.removeEventListener('click', onErrorPopupOutsideClick);
  };

  var onSuccessBlockEscape = function (evt) {
    window.util.onEscapePress(evt, hideSuccessBlock);
  };

  var onErrorBlockEscape = function (evt) {
    window.util.onEscapePress(evt, hideErrorBlock);
  };

  var onSuccessPopupOutsideClick = function (evt) {
    var isClickInside = successBlock.contains(evt.target);
    if (!isClickInside) {
      hideSuccessBlock();
    }
  };

  var onErrorPopupOutsideClick = function (evt) {
    var isClickInside = errorBlock.contains(evt.target);
    if (!isClickInside) {
      hideErrorBlock();
    }
  };

  var onSuccessButtonClick = function () {
    hideSuccessBlock();
  };

  var onErrorButtonClick = function () {
    hideErrorBlock();
  };

  var showSuccessMessage = function () {
    success.classList.remove('visually-hidden');
    document.addEventListener('click', onSuccessPopupOutsideClick);
    successButton.addEventListener('click', onSuccessButtonClick);
    document.addEventListener('keydown', onSuccessBlockEscape);
  };

  var showErrorMessage = function () {
    error.classList.remove('visually-hidden');
    document.addEventListener('click', onErrorPopupOutsideClick);
    errorButtonsElement.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onErrorBlockEscape);
  };

  window.formUploadPopup = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
