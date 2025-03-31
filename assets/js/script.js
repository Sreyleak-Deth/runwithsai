// Function to update meta tags dynamically
function updateMetaTags(title, description, imageUrl) {
  document.querySelector('meta[property="og:title"]').setAttribute("content", title);
  document.querySelector('meta[property="og:description"]').setAttribute("content", description);
  document.querySelector('meta[property="og:image"]').setAttribute("content", imageUrl);
  
  document.querySelector('meta[name="twitter:title"]').setAttribute("content", title);
  document.querySelector('meta[name="twitter:description"]').setAttribute("content", description);
  document.querySelector('meta[name="twitter:image"]').setAttribute("content", imageUrl);
}

updateMetaTags(
  "RunWithSAI - Organizer Details",
  "Join RunWithSAI for marathons and charity runs across Cambodia.",
  "https://runwithsai.com/assets/img/logo/about_us1.jpg"
);

// Page loading effect
document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.querySelector(".page-loading");
  if (preloader) {
    preloader.classList.remove("active");
    setTimeout(() => preloader.remove(), 1000);
  }
});

// Theme toggle functionality
const themeToggle = document.getElementById("theme-mode");
const logo = document.getElementById("logo");

function updateTheme(isDark) {
  logo.src = isDark ? "assets/svg/sai_logo_white.svg" : "assets/svg/sai_logo_black.svg";
  document.body.classList.toggle("dark-theme", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

if (localStorage.getItem("theme") === "dark") {
  themeToggle.checked = true;
  updateTheme(true);
}

themeToggle.addEventListener("change", () => updateTheme(themeToggle.checked));

// Only show "Read more" if content exceeds the maxHeight
document.addEventListener("DOMContentLoaded", function () {
  var eventSections = document.querySelectorAll('.content-preview');
  eventSections.forEach(function (contentDiv) {
    var readMoreBtn = contentDiv.nextElementSibling; 
    var maxHeight = 300;

    // Check if content exceeds maxHeight
    if (contentDiv.scrollHeight > maxHeight) {
      contentDiv.style.maxHeight = maxHeight + "px";
      contentDiv.style.overflow = "hidden";
      readMoreBtn.style.display = "inline-block"; 
    }

    // Remove the toggle functionality
    // Instead, route to the event's detail page when "Read more" is clicked
    readMoreBtn.addEventListener("click", function (event) {
      event.preventDefault(); 
      var eventUrl = readMoreBtn.getAttribute("href"); 
      if (eventUrl) {
        window.location.href = eventUrl;
      }
    });
  });
});

// Global variable to store current images and index
let currentImages = {};
let currentIndices = {};

// Function to open the image modal
function openImageModal(eventSlug, index) {
  // Get all images for this event from the DOM
  const modalElement = document.getElementById(`imageModal-${eventSlug}`);
  const images = [];
  
  // Find all images in the event's container
  const eventContainer = modalElement.closest('[aria-label="event-container"]');
  const imageElements = eventContainer.querySelectorAll('img[src^="media/events"]');
  
  imageElements.forEach(img => {
    images.push(img.src);
  });

  // Store images and current index for this event
  currentImages[eventSlug] = images;
  currentIndices[eventSlug] = parseInt(index);

  // Update the modal image and counter
  updateModalImage(eventSlug);
  
  // Show the modal
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

// Function to update the modal image
function updateModalImage(eventSlug) {
  const images = currentImages[eventSlug];
  const currentIndex = currentIndices[eventSlug];
  
  if (currentIndex >= 0 && currentIndex < images.length) {
    // Update the image source
    document.getElementById(`modalImage-${eventSlug}`).src = images[currentIndex];
    
    // Display the current image index (1-based)
    document.getElementById(`imageCount-${eventSlug}`).innerText = 
      `${currentIndex + 1} / ${images.length}`;
  }
}

// Function to navigate to the previous image
function prevImage(eventSlug) {
  const images = currentImages[eventSlug];
  let currentIndex = currentIndices[eventSlug];
  
  if (currentIndex > 0) {
    currentIndex--;
    currentIndices[eventSlug] = currentIndex;
    updateModalImage(eventSlug);
  }
}

// Function to navigate to the next image
function nextImage(eventSlug) {
  const images = currentImages[eventSlug];
  let currentIndex = currentIndices[eventSlug];
  
  if (currentIndex < images.length - 1) {
    currentIndex++;
    currentIndices[eventSlug] = currentIndex;
    updateModalImage(eventSlug);
  }
}

