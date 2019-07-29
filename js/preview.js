'use strict';
(function () {
  var imgUploadBlock = document.querySelector('.img-upload__start');
  var preview = document.querySelector('.img-upload__preview img');
  var inputFile = imgUploadBlock.querySelector('#upload-file');
  var effectPreviews = document.querySelectorAll('.effects__preview');

  var setPreviews = function (source) {
    effectPreviews.forEach(function (effectPreview) {
      effectPreview.style.backgroundImage = 'url(' + source + ')';
    });
  };

  var cleanPreviews = function () {
    effectPreviews.forEach(function (effectPreview) {
      effectPreview.style.backgroundImage = 'none';
    });
  };

  var FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];
  inputFile.addEventListener('change', function () {
    var file = inputFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
        setPreviews(reader.result);
      });
      reader.readAsDataURL(file);
    }
  });
  window.preview = {
    cleanPreviews: cleanPreviews
  };
})();
