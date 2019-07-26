'use strict';

(function () {
  var main = document.querySelector('main');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');

  var createPopupMessage = function (template) {
    var templateMessage = template.cloneNode(true);
    main.appendChild(templateMessage);
  };

  var hideSuccessBlock = function () {
    var success = main.querySelector('.success');
    main.removeChild(success);
    document.removeEventListener('keydown', onSuccessBlockEscape);
    document.removeEventListener('click', onSuccessPopupOutsideClick);
  };

  var hideErrorBlock = function () {
    var error = main.querySelector('.error');
    main.removeChild(error);
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
    var successBlock = main.querySelector('.success__inner');
    var isClickInside = successBlock.contains(evt.target);
    if (!isClickInside) {
      hideSuccessBlock();
    }
  };

  var onErrorPopupOutsideClick = function (evt) {
    var errorBlock = main.querySelector('.error__inner');
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
    createPopupMessage(templateSuccess);
    var successButton = main.querySelector('.success__button');
    document.addEventListener('click', onSuccessPopupOutsideClick);
    successButton.addEventListener('click', onSuccessButtonClick);
    document.addEventListener('keydown', onSuccessBlockEscape);
  };

  var showErrorMessage = function () {
    createPopupMessage(templateError);
    var errorButtonsElement = main.querySelector('.error__buttons');
    document.addEventListener('click', onErrorPopupOutsideClick);
    errorButtonsElement.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onErrorBlockEscape);
  };

  window.formUploadPopup = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
