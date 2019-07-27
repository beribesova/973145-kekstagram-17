'use strict';
(function () {
  var SUCCES_CODE = 200;
  var TIMEOUT_VALUE = 10000;
  var Url = {
    GET: 'https://js.dump.academy/kekstagram/data',
    POST: 'https://js.dump.academy/kekstagram'
  };

  var createXhr = function (onSuccess, onError, method, data, timeoutValue, responseTypeName) {
    var xhr = new XMLHttpRequest();
    if (responseTypeName) {
      xhr.responseType = responseTypeName;
    }

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCES_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    if (timeoutValue) {
      xhr.timeout = timeoutValue;
    }

    xhr.open(method, Url[method]);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var load = function (onSuccess, onError) {
    createXhr(onSuccess, onError, 'GET', null, TIMEOUT_VALUE, 'json');
  };

  var save = function (data, onSuccess, onError) {
    createXhr(onSuccess, onError, 'POST', data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
