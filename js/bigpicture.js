'use strict';
(function () {

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img');
  var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
  // var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var quantityComments = 0;
  var indexComments = 0;

  var renderComments = function (photos) {
    var commentsArr = [];
    for (var i = 0; i < photos.comments.length; i++) {
      var comment = document.createElement('li');
      comment.classList.add('social__comment');
      comment.classList.add('social__comment--text');
      var commentImage = document.createElement('img');
      commentImage.classList.add('social__picture');
      commentImage.src = photos.comments[i].avatar;
      commentImage.alt = photos.comments[i].name;
      commentImage.width = '35';
      commentImage.height = '35';
      comment.appendChild(commentImage);
      var commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentText.textContent = photos.comments[i].message;
      comment.appendChild(commentText);
      commentsArr[i] = comment;
    }
    return commentsArr;
  };

  var onPopupEscapePress = function (evt) {
    window.util.onEscapePress(evt, closeBigPicture);
  };

  var onPopupEnterPress = function (evt) {
    window.util.onEnterPress(evt, closeBigPicture);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    bigPictureCancel.removeEventListener('keydown', onPopupEnterPress);
    document.removeEventListener('keydown', onPopupEscapePress);
    pictures.addEventListener('click', onClickPictures);
    commentsLoader.removeEventListener('click', onClickLoader);
  };

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    bigPictureCancel.addEventListener('click', closeBigPicture);
    bigPictureCancel.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscapePress);
    commentsLoader.addEventListener('click', onClickLoader);
  };

  var fiveCommentsRender = function (indexComment, data) {
    var index = indexComment;
    // console.log('dkjghsliuyr', data[2].comments[0]);
    if (data[index].comments.length > 5 + quantityComments) {
      for (var i = 0 + quantityComments; i < 5 + quantityComments; i++) {
        renderComments(data);
        bigPicture.querySelector('.social__comments').appendChild(data[index].comments[i]);
      }
      quantityComments += 5;
    } else {
      for (i = 0 + quantityComments; i < data[index].comments.length; i++) {
        renderComments(data);
        bigPicture.querySelector('.social__comments').appendChild(data[index].comments[i]);
      }
      quantityComments += data[index].comments.length - quantityComments;
      commentsLoader.classList.add('visually-hidden');
    }
    bigPicture.querySelector('.social__comment-count').innerHTML = quantityComments + ' из <span class="comments-count">' + data[index].comments.length + '</span> комментариев';
  };

  var onClickLoader = function () {
    var data = [];
    data = window.gallery.getPhotosData();
    fiveCommentsRender(indexComments, data);
  };

  var setBigPicture = function (imgSrc, data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].url === imgSrc) {
        bigPictureImage.querySelector('img').src = data[i].url;
        bigPicture.querySelector('.social__comments').innerHTML = '';
        if (commentsLoader.classList[0] === 'social__comments-loader') {
          commentsLoader.classList.remove('visually-hidden');
        }
        // indexComments = i;
        quantityComments = 0;
        fiveCommentsRender(i, data);
        bigPictureSocial.querySelector('.social__caption').textContent = data[i].description;
        bigPictureSocial.querySelector('.likes-count').textContent = data[i].likes;
      }
    }
  };

  var onClickPictures = function (evt) {
    var data = window.gallery.getPhotosData();
    if (evt.target.tagName === 'IMG') {
      var imgSrc = evt.target.parentNode.querySelector('img').getAttribute('src');
      setBigPicture(imgSrc, data);
      openBigPicture();
      pictures.removeEventListener('click', onClickPictures);
    }
  };
  // socialCommentCount.classList.add('visually-hidden');
  // commentsLoader.classList.add('visually-hidden');
  pictures.addEventListener('click', onClickPictures);
})();
