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
    document.removeEventListener('click', onClickSuccessPopupOutside);
  };

  var hideErrorBlock = function () {
    var error = main.querySelector('.error');
    main.removeChild(error);
    document.removeEventListener('keydown', onErrorBlockEscape);
    document.removeEventListener('click', onClickErrorPopupOutside);
  };

  var onSuccessBlockEscape = function (evt) {
    window.util.onEscapePress(evt, hideSuccessBlock);
  };

  var onErrorBlockEscape = function (evt) {
    window.util.onEscapePress(evt, hideErrorBlock);
  };

  var onClickSuccessPopupOutside = function (evt) {
    var successBlock = main.querySelector('.success__inner');
    var isClickInside = successBlock.contains(evt.target);
    if (!isClickInside) {
      hideSuccessBlock();
    }
  };

  var onClickErrorPopupOutside = function (evt) {
    var errorBlock = main.querySelector('.error__inner');
    var isClickInside = errorBlock.contains(evt.target);
    if (!isClickInside) {
      hideErrorBlock();
    }
  };

  var onClickSuccessButton = function () {
    hideSuccessBlock();
  };

  var onClickErrorButton = function () {
    hideErrorBlock();
  };

  var showSuccessPopup = function () {
    createPopupMessage(templateSuccess);
    var successButton = main.querySelector('.success__button');
    document.addEventListener('click', onClickSuccessPopupOutside);
    successButton.addEventListener('click', onClickSuccessButton);
    document.addEventListener('keydown', onSuccessBlockEscape);
  };

  var showErrorPopup = function () {
    createPopupMessage(templateError);
    var errorButtons = main.querySelector('.error__buttons');
    document.addEventListener('click', onClickErrorPopupOutside);
    errorButtons.addEventListener('click', onClickErrorButton);
    document.addEventListener('keydown', onErrorBlockEscape);
  };

  window.formUploadPopup = {
    showSuccessPopup: showSuccessPopup,
    showErrorPopup: showErrorPopup
  };
})();
