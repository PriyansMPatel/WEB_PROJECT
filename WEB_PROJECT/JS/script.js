const carouselSlides = document.querySelector(".carousel-slides");
const carouselButtons = document.querySelectorAll(".carousel-button");
const carouselDots = document.querySelectorAll(".carousel-dot");

let currentSlide = 0;
let isSliding = false; // Flag to prevent multiple slide changes during animation

// Function to update carousel based on slide index
function updateCarousel(slideIndex) {
  carouselSlides.style.transform = `translateX(-${slideIndex * 100}%)`;
  carouselDots.forEach((dot) => dot.classList.remove("active"));
  carouselDots[slideIndex].classList.add("active");
}

// Function to handle next button click
function nextSlide() {
  if (!isSliding) {
    isSliding = true;
    currentSlide++;
    if (currentSlide === carouselSlides.children.length) {
      currentSlide = 0;
    }
    updateCarousel(currentSlide);
    setTimeout(() => (isSliding = false), 500); // Allow slide animation to finish
  }
}

// Function to handle previous button click
function prevSlide() {
  if (!isSliding) {
    isSliding = true;
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = carouselSlides.children.length - 1;
    }
    updateCarousel(currentSlide);
    setTimeout(() => (isSliding = false), 500); // Allow slide animation to finish
  }
}

// Function to handle dot click
function goToSlide(slideIndex) {
  if (!isSliding && currentSlide !== slideIndex) {
    isSliding = true;
    currentSlide = slideIndex;
    updateCarousel(currentSlide);
    setTimeout(() => (isSliding = false), 500); // Allow slide animation to finish
  }
}

// Add event listeners for buttons
carouselButtons[0].addEventListener("click", prevSlide);
carouselButtons[1].addEventListener("click", nextSlide);

// Add event listeners for dots
carouselDots.forEach((dot, index) => {
  dot.addEventListener("click", () => goToSlide(index));
});

// Start automatic slide change after 5 seconds
let intervalId = setInterval(nextSlide, 5000);

// Stop automatic slide change on hover over carousel container
const carouselContainer = document.querySelector(".carousel-container");
carouselContainer.addEventListener("mouseover", () =>
  clearInterval(intervalId)
);

// Restart automatic slide change on mouseout from carousel container
carouselContainer.addEventListener("mouseout", () => {
  intervalId = setInterval(nextSlide, 5000);
});

