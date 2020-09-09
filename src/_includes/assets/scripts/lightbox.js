;(function () {
  var pageContainer = document.querySelector("[data-page-container]");
  var lightBox = document.querySelector("[data-lightbox]");

  if (!lightBox) return;

  var currentIndex = 0,
      lightBoxImages = lightBox.querySelectorAll("img"),
      lightBoxImagesTotal = lightBoxImages.length - 1,
      lightBoxHeading = lightBox.querySelector("h2"),
      previousActiveElement = null;

  var show = function () {
    previousActiveElement = document.activeElement;
    pageContainer.inert = true;
    lightBox.inert = false;
    lightBox.classList.remove("hidden");
    lightBoxHeading.focus();
    lightBoxImages[currentIndex].classList.remove("hidden");
  };

  var hide = function () {
    pageContainer.inert = false;
    lightBox.inert = true;
    lightBox.classList.add("hidden");
    lightBoxImages[currentIndex].classList.add("hidden");
    currentIndex = 0;
    previousActiveElement.focus();
  };

  var next = function () {
    lightBoxImages[currentIndex].classList.add("hidden");
    if (currentIndex >= lightBoxImagesTotal) {
      currentIndex = 0;
      lightBoxImages[currentIndex].classList.remove("hidden");
    } else {
      currentIndex++;
      lightBoxImages[currentIndex].classList.remove("hidden");
    }
  };

  var previous = function () {
    lightBoxImages[currentIndex].classList.add("hidden");
    if (currentIndex === 0) {
      currentIndex = lightBoxImagesTotal;
      lightBoxImages[currentIndex].classList.remove("hidden");
    } else {
      currentIndex--;
      lightBoxImages[currentIndex].classList.remove("hidden");
    }
  };

  var clickEvents = function (event) {
    if (event.target.closest("[data-lightbox-show]")) {
      show();
    } else if (event.target.closest("[data-lightbox-hide]")) {
      hide();
    } else if (event.target.closest("[data-lightbox-next]")) {
      next();
    } else if (event.target.closest("[data-lightbox-previous]")) {
      previous();
    }
  };

  var keyboardEvents = function (event) {
    // Right arrow key
    if (event.keyCode === 39 && lightBox.classList.contains !== "hidden") {
      next();
    }
    // Left arrow key
    if (event.keyCode === 37 && lightBox.classList.contains !== "hidden") {
      previous();
    }
    // Escape key
    if (event.keyCode === 27 && lightBox.classList.contains !== "hidden") {
      hide();
    }
  };

  lightBox.inert = true;
  document.addEventListener("click", clickEvents);
  document.addEventListener("keydown", keyboardEvents);
})();
