const initSlider = () => {
  // Select slide buttons, image list and gallery wrapper
  const slideButtons = document.querySelectorAll(".slide-button");
  const imageList = document.querySelector(".image-list");
  const galleryWrap = document.querySelector(".gallary-Wrap");

  // Select scrollbar elements
  const scrollbarThumb = document.querySelector(".scrollbar-thumb");
  const scrollbarTrack = document.querySelector(".scrollbar-track");

  // Function to update scrollbar thumb position based on imageList scroll progress
  const updateScrollbar = () => {
    const scrollableWidth = imageList.scrollWidth - imageList.clientWidth;
    const scrollProgress = imageList.scrollLeft / scrollableWidth;
    const maxThumbMovement = scrollbarTrack.clientWidth - scrollbarThumb.clientWidth;
    const thumbLeft = scrollProgress * maxThumbMovement;
    scrollbarThumb.style.left = thumbLeft + "px";
  };

  // Listen to scroll events on the image list
  imageList.addEventListener("scroll", updateScrollbar);

  // Function to scroll images (when clicking slider buttons)
  const scrollImages = (direction) => {
    const scrollAmount = galleryWrap.clientWidth * direction;
    imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Attach click event listeners to slide buttons
  slideButtons.forEach(button => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      scrollImages(direction);
    });
  });

  // --- Draggable Scrollbar Code ---
  let isDragging = false;
  let startX;
  let startScrollLeft;

  // When the user presses the mouse down on the thumb
  scrollbarThumb.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startScrollLeft = imageList.scrollLeft;
    scrollbarThumb.classList.add("dragging"); // optional styling
    // Prevent text selection while dragging
    e.preventDefault();
  });

  // When the mouse is moved, if dragging update the scroll position
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    // Determine how far the mouse has moved
    const deltaX = e.clientX - startX;
    // Determine the ratio of scrollable width to thumb movement
    const scrollableWidth = imageList.scrollWidth - imageList.clientWidth;
    const maxThumbMovement = scrollbarTrack.clientWidth - scrollbarThumb.clientWidth;
    const scrollRatio = scrollableWidth / maxThumbMovement;
    imageList.scrollLeft = startScrollLeft + deltaX * scrollRatio;
  });

  // When the mouse is released, stop dragging
  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      scrollbarThumb.classList.remove("dragging");
    }
  });

  // Function to programmatically update the slide bar scroll position
  const goToSlide = (scrollAmount) => {
    // scrollAmount is the target left position
    imageList.scrollTo({ left: scrollAmount, behavior: "smooth" });
    // You can update the scrollbar after a small delay if needed:
    setTimeout(updateScrollbar, 300);
  };

  // Initialize scrollbar thumb position
  updateScrollbar();

  // Expose goToSlide globally for testing (optional)
  window.goToSlide = goToSlide;
};

window.addEventListener("load", initSlider);
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navCollapse = document.querySelector(".navbar-collapse");

  hamburger.addEventListener("click", function () {
      this.classList.toggle("active"); // For the animated cross effect
      navCollapse.classList.toggle("show"); // Bootstrap's way to show/hide navbar
  });

  // Close the menu when clicking outside
  document.addEventListener("click", function (event) {
      if (!hamburger.contains(event.target) && !navCollapse.contains(event.target)) {
          hamburger.classList.remove("active");
          navCollapse.classList.remove("show");
      }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelector('.slides');
  const images = slides.querySelectorAll('.img');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentIndex = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;
  let currentSlideWidth = images[0].clientWidth;

  function updateSlidePosition() {
      slides.style.transform = `translateX(-${currentIndex * currentSlideWidth}px)`;
  }

  function changeSlide(direction) {
      currentIndex += direction;
      if (currentIndex < 0) {
          currentIndex = images.length - 1;
      } else if (currentIndex >= images.length) {
          currentIndex = 0;
      }
      updateSlidePosition();
  }

  prevButton.addEventListener('click', function() {
      changeSlide(-1.8);
  });

  nextButton.addEventListener('click', function() {
      changeSlide(1.8);
  });

  window.addEventListener('resize', function() {
      currentSlideWidth = images[0].clientWidth;
      updateSlidePosition();
  });

  slides.addEventListener('mousedown', startDrag);
  slides.addEventListener('mouseup', endDrag);
  slides.addEventListener('mouseleave', endDrag);
  slides.addEventListener('mousemove', drag);

  slides.addEventListener('touchstart', startDrag);
  slides.addEventListener('touchend', endDrag);
  slides.addEventListener('touchmove', drag);

  function startDrag(event) {
      isDragging = true;
      startPos = getPositionX(event);
      animationID = requestAnimationFrame(animation);
      slides.classList.add('grabbing');
  }

  function endDrag() {
      isDragging = false;
      cancelAnimationFrame(animationID);
      const movedBy = currentTranslate - prevTranslate;

      if (movedBy < -100 && currentIndex < images.length - 1) {
          currentIndex += 1;
      }

      if (movedBy > 100 && currentIndex > 0) {
          currentIndex -= 1;
      }

      setPositionByIndex();
      slides.classList.remove('grabbing');
  }

  function drag(event) {
      if (isDragging) {
          const currentPosition = getPositionX(event);
          currentTranslate = prevTranslate + currentPosition - startPos;
      }
  }

  function getPositionX(event) {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  function animation() {
      setSliderPosition();
      if (isDragging) requestAnimationFrame(animation);
  }

  function setSliderPosition() {
      slides.style.transform = `translateX(${currentTranslate}px)`;
  }

  function setPositionByIndex() {
      currentTranslate = currentIndex * -currentSlideWidth;
      prevTranslate = currentTranslate;
      setSliderPosition();
  }
});



gsap.from(".small h2" , {
    duration:0.6,
    x:-500
})



//faq
function toggleAnswer(element) {
  const answer = element.nextElementSibling;
  const icon = element.querySelector('.toggle-icon');
  const h4 = element.querySelector(".faq-question h4");
  if (answer.style.display === 'block') {
      answer.style.display = 'none';
      icon.textContent = '+';
      icon.style = "color: black";
      h4.style = "color: black ";
  } else {
      answer.style.display = 'block';
      icon.textContent = '-';
      icon.style = "color: red";
      h4.style = "color: rgb(15, 35, 151)";
  }
}

 /// footer
gsap.to(".moving-div .move" ,{
  transform:"translateX(-100%)",
  repeat:-1,
  duration:20,
  ease:"none"
})

gsap.from(".footer h3" , {
  x:-900,
  scrollTrigger : {
    trigger : ".footer",
    scroller : "body",
    start:"top 60%",
    end : "top 80%",
    scrub: 5
  }
})


//contact us gsap code
gsap.from(".head h2",{
  duration:0.7,
  opacity:0,
  x : -1000,
  stagger:1,
});


   








