'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var lastTimeout = null;

  window.util = {
    onEscapePress: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    onEnterPress: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    getPercent: function (value, base) {
      return Math.round((value * 100) / base);
    },
    getValueInRange: function (value, min, max) {
      return Math.min(Math.max(value, min), max);
    },
    debounce: function (debounceFunction, data, debounceTime) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(debounceFunction(data), debounceTime);
    }
  };
})();
