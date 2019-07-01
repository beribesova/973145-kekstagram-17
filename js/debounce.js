'use strict';
(function () {
  var DEBOUNCE_TIME = 500;
  var lastTimeout = null;
  window.debounce = function (data) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.gallery.createPhotosFragment(data);
    }, DEBOUNCE_TIME);
  };
})();
