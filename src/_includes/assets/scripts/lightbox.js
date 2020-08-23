var lightbox = (function() {
  var lightBox = document.querySelector('[data-lightbox]');

  if (!lightBox) return;

  var currentIndex = 0;
  var lightBoxImages = lightBox.querySelectorAll('img');

  var addEventListeners = function() {
    document.addEventListener('click', clickEvents);
    document.addEventListener('keydown', keyboardEvents);
  }

  var show = function() {
    lightBox.classList.remove('hidden');
  }

  var hide = function() {
    lightBox.classList.add('hidden');
    currentIndex = 0;
  }

  var next = function() {
    lightBoxImages[currentIndex].classList.add('hidden');
    if (currentIndex >= lightBoxImages.length - 1) {
      currentIndex = 0;
      lightBoxImages[currentIndex].classList.remove('hidden');
    } else {
      currentIndex++;
      lightBoxImages[currentIndex].classList.remove('hidden');
    }
  }

  var previous = function() {
    lightBoxImages[currentIndex].classList.add('hidden');
    if (currentIndex === 0) {
      currentIndex = lightBoxImages.length - 1;
      lightBoxImages[currentIndex].classList.remove('hidden');
    } else {
      currentIndex--;
      lightBoxImages[currentIndex].classList.remove('hidden');
    }
  }

  var clickEvents = function(event) {
    if (event.target.closest('[data-lightbox-show]')) {
      show();
    } else if (event.target.closest('[data-lightbox-hide]')) {
      hide();
    }
  }

  var keyboardEvents = function(event) {
    // Right arrow key
    if (event.keyCode === 39 && lightBox.classList.contains !== 'hidden') {
      next();
    }
    // Left arrow key
    if (event.keyCode === 37 && lightBox.classList.contains !== 'hidden') {
      previous();
    }
    // Escape key
    if (event.keyCode === 27 && lightBox.classList.contains !== 'hidden') {
      hide();
    }
  }

  var init = function() {
    addEventListeners();
  }

  return {
    init
  }
})();