'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Артем', 'Катя', 'Максим', 'Лиза', 'Евгений', 'Сергей', 'Маша'];
var COMMENTS_NUMBER = 25;
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = uploadSelectImage.querySelector('#upload-file');
var uploadOverlayImg = document.querySelector('.img-upload__overlay ');
var uploadClose = uploadOverlayImg.querySelector('#upload-cancel');
var slider = document.querySelector('.img-upload__effect-level');
var item = slider.querySelector('.effect-level__pin');
var uploadPreview = document.querySelector('.img-upload__preview');
var effectsPreview = document.querySelectorAll('.effects__preview');
var effectValue = slider.querySelector('.effect-level__value');
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

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  uploadOverlayImg.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  uploadOverlayImg.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var calculateValue = function (sliderValue, min, max) {
  if (sliderValue === 0) {
    return min;
  } else {
    return ((max - min) * sliderValue) / 100 + min;
  }
};

var calculateValues = function (evt) {
  switch (evt.target.classList[1]) {
    case 'effects__preview--chrome':
      uploadPreview.style.filter = 'grayscale(' + calculateValue(effectValue.value, 0, 1) + ')';
      break;
    case 'effects__preview--sepia':
      uploadPreview.style.filter = 'sepia(' + calculateValue(effectValue.value, 0, 1) + ')';
      break;
    case 'effects__preview--marvin':
      uploadPreview.style.filter = 'invert(' + calculateValue(effectValue.value, 0, 100) + '%)';
      break;
    case 'effects__preview--phobos':
      uploadPreview.style.filter = 'blur(' + calculateValue(effectValue.value, 0, 3) + 'px)';
      break;
    case 'effects__preview--heat':
      uploadPreview.style.filter = 'brightness(' + calculateValue(effectValue.value, 1, 3) + ')';
      break;
  }
};

var changeEffect = function () {
  for (var i = 0; i <= 5; i++) {
    effectsPreview[i].addEventListener('click', function (evt) {

      if (evt.target.classList[1] === 'effects__preview--none') {
        slider.classList.add('hidden');
      } else {
        slider.classList.remove('hidden');
      }

      calculateValues(evt);
    }
    );
  }
};

var kekstagramPhotoTemplate = document.querySelector('#picture').content;

var photosData = getPhotos();
createPhotos(kekstagramPhotoTemplate, photosData);

uploadFile.addEventListener('change', function () {
  openPopup();
});

uploadClose.addEventListener('click', function () {
  closePopup();
});

uploadClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

item.addEventListener('mouseup', function (evt) {
  calculateValues(evt);
});

changeEffect();
