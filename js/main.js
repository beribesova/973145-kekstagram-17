'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Артем', 'Катя', 'Максим', 'Лиза', 'Евгений', 'Сергей', 'Маша'];
var COMMENTS_NUMBER = 25;
var uploadFile = document.querySelector('#upload-file');
var uploadOverlayImage = document.querySelector('.img-upload__overlay ');
var uploadClose = uploadOverlayImage.querySelector('#upload-cancel');
var slider = document.querySelector('.img-upload__effect-level');
var uploadImageEffects = document.querySelector('.img-upload__effects ');
// var effectsRadio = document.querySelectorAll('.effects__radio');
// var effectsList = document.querySelectorAll('.effects__list');
var effectLevelPin = slider.querySelector('.effect-level__pin');
var effectLevelLine = slider.querySelector('.effect-level__line');
var uploadPreviewImage = document.querySelector('.img-upload__preview img');
var effectValue = slider.querySelector('.effect-level__value');
var activeEffectRadio = document.querySelector('.effects__radio:checked');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomComments = function () {
  var requireCount = getRandomNumber(1, 2);
  var randomComments = '';
  var commentsIdx = [];

  for (var i = 0; i < requireCount; i++) {
    commentsIdx[i] = getRandomNumber(0, COMMENTS.length);
  }

  for (i = 0; i < requireCount; i++) {
    if (i === requireCount - 1) {
      randomComments += COMMENTS[commentsIdx[i]];
    } else {
      randomComments += COMMENTS[commentsIdx[i]] + '&nbsp;';
    }
  }
  return randomComments;
};

var getRandomName = function () {
  return NAMES[getRandomNumber(0, NAMES.length)];
};

var getPhotoListElement = function () {
  var photoListElement = document.querySelector('.pictures');
  return photoListElement;
};

var getPhotoData = function (photoIdx) {
  var photoData = {
    url: 'photos/' + (photoIdx + 1) + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: getComments()
  };
  return photoData;
};

var getPhotos = function () {
  var photos = [];
  for (var i = 0; i < COMMENTS_NUMBER; i++) {
    photos[i] = getPhotoData(i);
  }
  return photos;
};

var getCommentData = function () {
  var commentData = {
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    message: getRandomComments(),
    name: getRandomName()
  };
  return commentData;
};

var getComments = function () {
  var messages = [];
  for (var i = 0; i < getRandomNumber(1, 5); i++) {
    messages[i] = getCommentData();
  }
  return messages;
};

var renderPhoto = function (kekstagramPhotoTemplate, photo) {
  var kekstagramElement = kekstagramPhotoTemplate.cloneNode(true);
  kekstagramElement.querySelector('img').src = photo.url;
  kekstagramElement.querySelector('.picture__likes').textContent = photo.likes;
  kekstagramElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return kekstagramElement;
};

var createPhoto = function (fragment, kekstagramPhotoTemplate, photos) {
  fragment.appendChild(renderPhoto(kekstagramPhotoTemplate, photos));
};

var createPhotos = function (kekstagramPhotoTemplate, photosData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photosData.length; i++) {
    createPhoto(fragment, kekstagramPhotoTemplate, photosData[i]);
  }
  getPhotoListElement().appendChild(fragment);
};

var onPopupEscapePress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  uploadOverlayImage.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscapePress);
};

var closePopup = function () {
  uploadOverlayImage.classList.add('hidden');
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

var onEffectChange = function (effectName, value) {
  uploadPreviewImage.className = '';
  effectValue.classList.remove('hidden');
  uploadPreviewImage.classList.add('effects__preview--' + effectName);
  applyEffect(effectName, value);

  if (effectName === 'none') {
    effectValue.classList.add('hidden');
  }
};

var resetEffect = function () {
  effectValue.value = 100;
  return effectValue.value;
};

var hideSlider = function (effect) {
  if (effect) {
    slider.classList.add('hidden');
  } else {
    slider.classList.remove('hidden');
  }
};

var setEffect = function (effectsToggle) {
  hideSlider(effectsToggle.id === 'effect-none');
  var value = resetEffect();
  onEffectChange(effectsToggle.value, value);
};

var addClickEffectsListener = function () {
  uploadImageEffects.addEventListener('click', function (evt) {
    var effectsToggle = evt.target;
    if (effectsToggle.localName === 'input') {
      setEffect(effectsToggle);
    }
  });
};

var kekstagramPhotoTemplate = document.querySelector('#picture').content;

var photosData = getPhotos();
createPhotos(kekstagramPhotoTemplate, photosData);

uploadFile.addEventListener('change', function () {
  openPopup();
  uploadFile.blur();
});

uploadClose.addEventListener('click', function () {
  closePopup();
});

uploadClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

addClickEffectsListener();

effectLevelPin.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  effectValue.value = Math.round((evt.target.offsetLeft * 100) / effectLevelLine.offsetWidth);
  applyEffect(activeEffectRadio.value, effectValue.value);
});

