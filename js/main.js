'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Артем', 'Катя', 'Максим', 'Лиза', 'Евгений', 'Сергей', 'Маша'];
var COMMENTS_NUMBER = 25;

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomComments = function () {
  var requireCount = getRandomNumber(1, 2);
  var randomComments = '';
  var commentsIdx = [];
  var comments = [];
  for (var i = 0; i < requireCount; i++) {
    commentsIdx[i] = getRandomNumber(0, COMMENTS.length);
    for (var j = 0; j < requireCount; j++) {
      comments[j] = COMMENTS[commentsIdx[i]];
    }
  }
  for (i = 0; i < requireCount; i++) {
    if (i === requireCount - 1) {
      randomComments += comments[i];
    } else {
      randomComments += comments[i] + '&nbsp;';
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

var kekstagramPhotoTemplate = document.querySelector('#picture').content;

var photosData = getPhotos();
createPhotos(kekstagramPhotoTemplate, photosData);
