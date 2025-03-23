document.addEventListener('DOMContentLoaded', () => {
  initializeAnimations();
  setupLikeButtons();
  setupToggleButtons();
  setupShareButtons();
  setupFeedbackForm();
  setupScrollToTop();
  setupUploadButton();
  applySavedTheme();
});

// Initialize animations for page elements
const initializeAnimations = () => {
  // Add scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  // Observe all pages for scroll animation
  document.querySelectorAll('.page').forEach(page => {
    observer.observe(page);
  });
  
  // Animate title on load
  const title = document.getElementById('title');
  if (title) {
    title.style.opacity = '0';
    title.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
    }, 300);
  }
};

// Set up like and dislike buttons
const setupLikeButtons = () => {
  const posts = document.querySelectorAll('.page');
  posts.forEach(post => {
    const likeButton = post.querySelector('.like-btn');
    const dislikeButton = post.querySelector('.dislike-btn');
    
    // Check if there are saved preferences in localStorage
    const postId = post.querySelector('.photo img').getAttribute('src');
    const savedReaction = localStorage.getItem(`reaction-${postId}`);
    
    let likeActive = false;
    let dislikeActive = false;
    
    if (savedReaction === 'like') {
      likeButton.classList.add('green');
      likeActive = true;
    } else if (savedReaction === 'dislike') {
      dislikeButton.classList.add('red');
      dislikeActive = true;
    }

    // Add click event listener to the "like" button
    likeButton.addEventListener('click', function() {
      likeActive = !likeActive;
      this.classList.toggle('green');
      
      // Add the pulse animation
      this.classList.add('zoom');
      setTimeout(() => {
        this.classList.remove('zoom');
      }, 300);

      // Save the reaction to localStorage
      if (likeActive) {
        localStorage.setItem(`reaction-${postId}`, 'like');
        dislikeActive = false;
        dislikeButton.classList.remove('red');
      } else {
        localStorage.removeItem(`reaction-${postId}`);
      }
    });

    // Add click event listener to the "dislike" button
    dislikeButton.addEventListener('click', function() {
      dislikeActive = !dislikeActive;
      this.classList.toggle('red');
      
      // Add the pulse animation
      this.classList.add('zoom');
      setTimeout(() => {
        this.classList.remove('zoom');
      }, 300);

      // Save the reaction to localStorage
      if (dislikeActive) {
        localStorage.setItem(`reaction-${postId}`, 'dislike');
        likeActive = false;
        likeButton.classList.remove('green');
      } else {
        localStorage.removeItem(`reaction-${postId}`);
      }
    });
  });
};

// Function to set up toggle buttons for pages
const setupToggleButtons = () => {
  const toggleButtons = document.querySelectorAll('.toggle-button');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const page = button.closest('.page');
      const photo = page.querySelector('.photo');
      const caption = page.querySelector('.caption');
      
      if (button.textContent === 'Hide') {
        // Hide the photo with animation
        photo.style.transition = 'opacity 0.3s ease, height 0.5s ease';
        photo.style.opacity = '0';
        photo.style.height = '0';
        
        // Hide the caption
        caption.style.transition = 'opacity 0.3s ease';
        caption.style.opacity = '0';
        
        setTimeout(() => {
          photo.style.display = 'none';
          caption.style.display = 'none';
          button.textContent = 'Show';
        }, 300);
      } else {
        // Show the photo with animation
        photo.style.display = 'block';
        caption.style.display = 'block';
        
        // Trigger reflow to ensure transition works
        void page.offsetWidth;
        
        photo.style.opacity = '1';
        photo.style.height = 'auto';
        caption.style.opacity = '1';
        button.textContent = 'Hide';
      }
    });
  });
};

// Function to set up share buttons
const setupShareButtons = () => {
  const shareButtons = document.querySelectorAll('.share-button');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', () => {
      const page = button.closest('.page');
      const link = page.querySelector('a').getAttribute('href');
      const caption = page.querySelector('.caption').textContent;
      
      // Use Web Share API if available
      if (navigator.share) {
        navigator.share({
          title: 'Sleeper\'s Online Photo Flipbook',
          text: `Check out this photo: ${caption}`,
          url: link,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
      } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(link).then(() => {
          // Create and show a tooltip
          const tooltip = document.createElement('div');
          tooltip.textContent = 'Link copied!';
          tooltip.style.position = 'absolute';
          tooltip.style.backgroundColor = '#333';
          tooltip.style.color = 'white';
          tooltip.style.padding = '5px 10px';
          tooltip.style.borderRadius = '4px';
          tooltip.style.fontSize = '12px';
          tooltip.style.zIndex = '1000';
          tooltip.style.opacity = '0';
          tooltip.style.transition = 'opacity 0.3s ease';
          
          // Position the tooltip above the button
          const rect = button.getBoundingClientRect();
          tooltip.style.top = `${window.scrollY + rect.top - 30}px`;
          tooltip.style.left = `${window.scrollX + rect.left - 10}px`;
          
          // Add to body, animate, and then remove
          document.body.appendChild(tooltip);
          void tooltip.offsetWidth; // Force reflow
          tooltip.style.opacity = '1';
          
          setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
          }, 2000);
        });
      }
    });
  });
};

// Set up the scroll to top button functionality
const setupScrollToTop = () => {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (!scrollToTopBtn) return;
  
  // Show button when page is scrolled down
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// Set up the upload button functionality (demo only)
const setupUploadButton = () => {
  const uploadBtn = document.querySelector('.upload-button');
  if (!uploadBtn) return;
  
  uploadBtn.addEventListener('click', () => {
    // Create a modal for demonstration
    const modal = document.createElement('div');
    modal.className = 'upload-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '2000';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#333' : 'white';
    modalContent.style.color = document.body.classList.contains('dark-mode') ? 'white' : '#333';
    modalContent.style.padding = '30px';
    modalContent.style.borderRadius = '10px';
    modalContent.style.maxWidth = '500px';
    modalContent.style.width = '90%';
    modalContent.style.textAlign = 'center';
    modalContent.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    modalContent.style.transform = 'translateY(20px)';
    modalContent.style.transition = 'transform 0.3s ease';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Upload a New Photo';
    modalTitle.style.marginBottom = '20px';
    
    const modalText = document.createElement('p');
    modalText.textContent = 'This feature is coming soon! In the future, you will be able to upload your own photos to the flipbook.';
    modalText.style.marginBottom = '20px';
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.padding = '10px 20px';
    closeBtn.style.backgroundColor = '#8d6309';
    closeBtn.style.color = 'white';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '5px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.transition = 'background-color 0.3s';
    
    closeBtn.addEventListener('mouseover', () => {
      closeBtn.style.backgroundColor = '#614c32';
    });
    
    closeBtn.addEventListener('mouseout', () => {
      closeBtn.style.backgroundColor = '#8d6309';
    });
    
    closeBtn.addEventListener('click', () => {
      modalContent.style.transform = 'translateY(20px)';
      modal.style.opacity = '0';
      
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    });
    
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalText);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
    
    // Trigger reflow for animation
    void modal.offsetWidth;
    
    // Show modal with animation
    modal.style.opacity = '1';
    modalContent.style.transform = 'translateY(0)';
  });
};

// Function to toggle the theme
const toggleTheme = () => {
  const body = document.body;
  body.classList.toggle('dark-mode');
  
  // Add transition for smooth theme change
  body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
  
  const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
};

// Apply the saved theme from localStorage on load
const applySavedTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('slideThree').checked = true;
  }
};

// Event listener for the theme toggle button
document.getElementById('slideThree').addEventListener('change', toggleTheme);

// Function to set up the feedback form
const setupFeedbackForm = () => {
  const feedbackForm = document.getElementById('feedbackForm');
  if (!feedbackForm) return;
  
  feedbackForm.style.display = 'flex';

  // Create form title
  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Share Your Thoughts';
  formTitle.style.textAlign = 'center';
  formTitle.style.marginBottom = '20px';
  feedbackForm.appendChild(formTitle);

  // Create Username input
  const usernameInput = document.createElement('input');
  usernameInput.type = 'text';
  usernameInput.placeholder = 'Enter your username...';
  usernameInput.id = 'username';
  usernameInput.required = true;
  feedbackForm.appendChild(usernameInput);

  // Create Email input
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = 'Enter your email...';
  emailInput.id = 'email';
  emailInput.required = true;
  feedbackForm.appendChild(emailInput);

  // Create Feedback Type dropdown
  const feedbackSelect = document.createElement('select');
  feedbackSelect.id = 'feedbackType';
  
  const options = [
    { value: '', text: '-- Select Feedback Type --' },
    { value: 'general', text: 'General Feedback' },
    { value: 'enhancement', text: 'App Enhancement' },
    { value: 'comment', text: 'General Comment' },
    { value: 'bug', text: 'Bug Report' }
  ];

  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.text;
    feedbackSelect.appendChild(opt);
  });

  feedbackForm.appendChild(feedbackSelect);

  // Create Rating input
  const ratingContainer = document.createElement('div');
  ratingContainer.style.margin = '10px 0';
  ratingContainer.style.textAlign = 'center';
  
  const ratingLabel = document.createElement('p');
  ratingLabel.textContent = 'Rate your experience:';
  ratingLabel.style.marginBottom = '5px';
  ratingContainer.appendChild(ratingLabel);
  
  const stars = document.createElement('div');
  stars.classList.add('stars');
  stars.style.display = 'flex';
  stars.style.justifyContent = 'center';
  stars.style.gap = '5px';
  
  let selectedRating = 0;
  
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.innerHTML = '&#9734;'; // Empty star
    star.style.fontSize = '24px';
    star.style.color = '#ffd700';
    star.style.cursor = 'pointer';
    star.dataset.value = i;
    
    star.addEventListener('mouseover', function() {
      // Fill this star and all stars before it
      const rating = this.dataset.value;
      document.querySelectorAll('.stars span').forEach(s => {
        if (s.dataset.value <= rating) {
          s.innerHTML = '&#9733;'; // Filled star
        } else {
          s.innerHTML = '&#9734;'; // Empty star
        }
      });
    });
    
    star.addEventListener('mouseout', function() {
      // Reset to selected rating
      document.querySelectorAll('.stars span').forEach(s => {
        if (s.dataset.value <= selectedRating) {
          s.innerHTML = '&#9733;'; // Filled star
        } else {
          s.innerHTML = '&#9734;'; // Empty star
        }
      });
    });
    
    star.addEventListener('click', function() {
      selectedRating = this.dataset.value;
      localStorage.setItem('rating', selectedRating);
      
      // Update all stars
      document.querySelectorAll('.stars span').forEach(s => {
        if (s.dataset.value <= selectedRating) {
          s.innerHTML = '&#9733;'; // Filled star
        } else {
          s.innerHTML = '&#9734;'; // Empty star
        }
      });
    });
    
    stars.appendChild(star);
  }
  
  ratingContainer.appendChild(stars);
  feedbackForm.appendChild(ratingContainer);

  // Create Feedback Textarea
  const feedbackTextarea = document.createElement('textarea');
  feedbackTextarea.placeholder = 'Enter your feedback here...';
  feedbackTextarea.required = true;
  feedbackForm.appendChild(feedbackTextarea);

  // Create Submit Button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit Feedback';
  feedbackForm.appendChild(submitButton);

  // Load saved values from localStorage
  usernameInput.value = localStorage.getItem('username') || '';
  emailInput.value = localStorage.getItem('email') || '';
  feedbackSelect.value = localStorage.getItem('feedbackType') || '';
  feedbackTextarea.value = localStorage.getItem('feedbackText') || '';
  selectedRating = localStorage.getItem('rating') || 0;
  
  // Set the stars to match the saved rating
  if (selectedRating > 0) {
    document.querySelectorAll('.stars span').forEach(s => {
      if (s.dataset.value <= selectedRating) {
        s.innerHTML = '&#9733;'; // Filled star
      }
    });
  }

  // Save values to localStorage on input
  usernameInput.addEventListener('input', () => {
    localStorage.setItem('username', usernameInput.value);
  });

  emailInput.addEventListener('input', () => {
    localStorage.setItem('email', emailInput.value);
  });

  feedbackSelect.addEventListener('change', () => {
    localStorage.setItem('feedbackType', feedbackSelect.value);
  });

  feedbackTextarea.addEventListener('input', () => {
    localStorage.setItem('feedbackText', feedbackTextarea.value);
  });

  // Handle feedback submission
  submitButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Basic validation
    if (!usernameInput.value || !emailInput.value || !feedbackSelect.value || !feedbackTextarea.value) {
      const errorMsg = document.createElement('div');
      errorMsg.textContent = 'Please fill in all required fields';
      errorMsg.style.color = 'red';
      errorMsg.style.marginTop = '10px';
      errorMsg.style.textAlign = 'center';
      
      // Remove any existing error message
      const existingError = feedbackForm.querySelector('.error-message');
      if (existingError) existingError.remove();
      
      errorMsg.classList.add('error-message');
      feedbackForm.appendChild(errorMsg);
      return;
    }
    
    const username = usernameInput.value;
    const email = emailInput.value;
    const feedbackType = feedbackSelect.value;
    const feedbackText = feedbackTextarea.value;
    const rating = selectedRating;

    console.log(`Username: ${username}, Email: ${email}, Feedback Type: ${feedbackType}, Rating: ${rating}, Feedback: ${feedbackText}`);
    
    // Create thank you message with animation
    feedbackForm.innerHTML = '';
    const thankYou = document.createElement('div');
    thankYou.classList.add('thank-you-message');
    thankYou.style.textAlign = 'center';
    thankYou.style.opacity = '0';
    thankYou.style.transform = 'translateY(20px)';
    thankYou.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    const thankYouIcon = document.createElement('div');
    thankYouIcon.innerHTML = '✅';
    thankYouIcon.style.fontSize = '48px';
    thankYouIcon.style.margin = '20px 0';
    
    const thankYouTitle = document.createElement('h2');
    thankYouTitle.textContent = 'Thank You!';
    thankYouTitle.style.marginBottom = '10px';
    
    const thankYouText = document.createElement('p');
    thankYouText.textContent = 'Your feedback has been submitted successfully.';
    
    thankYou.appendChild(thankYouIcon);
    thankYou.appendChild(thankYouTitle);
    thankYou.appendChild(thankYouText);
    feedbackForm.appendChild(thankYou);
    
    // Animate the thank you message
    setTimeout(() => {
      thankYou.style.opacity = '1';
      thankYou.style.transform = 'translateY(0)';
    }, 100);

    // Clear localStorage after submission
    localStorage.removeItem('feedbackType');
    localStorage.removeItem('feedbackText');
    localStorage.removeItem('rating');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setupFeedbackForm();
    }, 3000);
  });
};
