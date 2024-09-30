document.addEventListener('DOMContentLoaded', () => {
  initializeLikeButtons();
  setupFeedbackForm();
});

const posts = document.querySelectorAll('.page'); // Select all posts (your photo containers)
posts.forEach(post => {
    const likeButton = post.querySelector('.like-btn');
    const dislikeButton = post.querySelector('.dislike-btn');
    let likeActive = false; // Initial state for like
    let dislikeActive = false; // Initial state for dislike

    // Add click event listener to the "like" button
    likeButton.addEventListener('click', function() {
        likeActive = !likeActive; // Toggle like state
        this.classList.toggle('green'); // Change the button color
        // Add the zoom effect class
        this.classList.add('zoom');
        // Remove the zoom class after a short delay
        setTimeout(() => {
            this.classList.remove('zoom');
        }, 200); // Match this duration to your CSS transition duration

        // If like is active, deactivate dislike
        if (likeActive) {
            dislikeActive = false; // Ensure dislike is inactive
            dislikeButton.classList.remove('red'); // Change the dislike button color
        }
    });

    // Add click event listener to the "dislike" button
    dislikeButton.addEventListener('click', function() {
        dislikeActive = !dislikeActive; // Toggle dislike state
        this.classList.toggle('red'); // Change the button color
        // Add the zoom effect class
        this.classList.add('zoom');
        // Remove the zoom class after a short delay
        setTimeout(() => {
            this.classList.remove('zoom');
        }, 200); // Match this duration to your CSS transition duration

        // If dislike is active, deactivate like
        if (dislikeActive) {
            likeActive = false; // Ensure like is inactive
            likeButton.classList.remove('green'); // Change the like button color
        }
    });
});

// Function to set up toggle buttons for pages
const setupToggleButtons = () => {
  const toggleButtons = document.querySelectorAll('.toggle-button');
  toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
          const page = button.closest('.page'); // Get the closest page container
          if (page.style.display === 'none' || !page.style.display) {
              page.style.display = 'block'; // Show the page
              button.textContent = 'Hide'; // Change button text to 'Hide'
          } else {
              page.style.display = 'none'; // Hide the page
              button.textContent = 'Show'; // Change button text to 'Show'
          }
      });
  });
};

// Call the setup function after DOM content is loaded
document.addEventListener('DOMContentLoaded', setupToggleButtons);

// Function to copy the current URL to the clipboard
const copyUrl = (btn) => {
  const url = window.location.href; // Get the current URL
  navigator.clipboard.writeText(url).then(() => {
      // Optionally, you can provide feedback that the URL was copied
      alert("URL copied to clipboard!");
  }).catch(err => {
      console.error("Failed to copy: ", err);
  });
};


// Function to toggle the theme
const toggleTheme = () => {
  const body = document.body;
  body.classList.toggle('dark-mode');
  const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
};

// Apply the saved theme from localStorage on load
const applySavedTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      document.getElementById('slideThree').checked = true; // Check the toggle
  }
};

// Event listener for the theme toggle button
document.getElementById('slideThree').addEventListener('change', toggleTheme);

document.addEventListener('DOMContentLoaded', () => {
  applySavedTheme(); // Apply the saved theme on load
});

const setupFeedbackForm = () => {
  const feedbackForm = document.getElementById('feedbackForm');
  feedbackForm.style.display = 'flex';

  // Create Username input
  const usernameInput = document.createElement('input');
  usernameInput.type = 'text';
  usernameInput.placeholder = 'Enter your username...';
  usernameInput.id = 'username';
  feedbackForm.appendChild(usernameInput);

  // Create Email input
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = 'Enter your email...';
  emailInput.id = 'email';
  feedbackForm.appendChild(emailInput);

  // Create Feedback Type dropdown
  const feedbackSelect = document.createElement('select');
  feedbackSelect.id = 'feedbackType';
  
  const options = [
    { value: 'general', text: 'General Feedback' },
    { value: 'enhancement', text: 'App Enhancement' },
    { value: 'comment', text: 'General Comment' }
  ];

  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.text;
    feedbackSelect.appendChild(opt);
  });

  feedbackForm.appendChild(feedbackSelect);

  // Create Feedback Textarea
  const feedbackTextarea = document.createElement('textarea');
  feedbackTextarea.placeholder = 'Enter your feedback here...';
  feedbackForm.appendChild(feedbackTextarea);

  // Create Submit Button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit Feedback';
  feedbackForm.appendChild(submitButton);

  // Load saved values from localStorage
  usernameInput.value = localStorage.getItem('username') || '';
  emailInput.value = localStorage.getItem('email') || '';
  feedbackSelect.value = localStorage.getItem('feedbackType') || 'general';
  feedbackTextarea.value = localStorage.getItem('feedbackText') || '';

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
    const username = usernameInput.value;
    const email = emailInput.value;
    const feedbackType = feedbackSelect.value;
    const feedbackText = feedbackTextarea.value;

    console.log(`Username: ${username}, Email: ${email}, Feedback Type: ${feedbackType}, Feedback: ${feedbackText}`);
    
    // Show popup message
    alert("Feedback Sent!");

    // Clear localStorage after submission
    localStorage.removeItem('feedbackType');
    localStorage.removeItem('feedbackText');
    
    // Optionally, you could handle feedback submission to a server here...
  });
};
