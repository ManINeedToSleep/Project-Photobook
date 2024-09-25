document.addEventListener('DOMContentLoaded', () => {
    // Initialize like/dislike functionality
    const likeIcons = document.querySelectorAll('.like-icon');
    likeIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        const isLiked = icon.getAttribute('data-liked') === 'true';
        if (isLiked) {
          icon.src = './Img/Heartless.png';
          icon.setAttribute('data-liked', 'false');
        } else {
          icon.src = './Img/HeartLike.png';
          icon.setAttribute('data-liked', 'true');
        }
      });
    });

    // Toggle visibility of pages
    const toggleButtons = document.querySelectorAll('.toggle-button');
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const page = button.closest('.page'); // Get the closest page container
        if (page.style.display === 'none') {
          page.style.display = 'block'; // Show the page
          button.textContent = 'Hide'; // Change button text to 'Hide'
        } else {
          page.style.display = 'none'; // Hide the page
          button.textContent = 'Show'; // Change button text to 'Show'
        }
      });
    });
  
    // Dynamically load feedback form
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.style.display = 'flex';
});

document.addEventListener('DOMContentLoaded', () => {
    // Existing code...

    // Initialize feedback form dynamically
    const feedbackForm = document.getElementById('feedbackForm');

    // Create select element
    const feedbackSelect = document.createElement('select');
    feedbackSelect.id = 'feedbackType';

    // Create options for the select element
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

    // Append select to feedback form
    feedbackForm.appendChild(feedbackSelect);

    // Add textarea and submit button
    const feedbackTextarea = document.createElement('textarea');
    feedbackTextarea.placeholder = 'Enter your feedback here...';
    feedbackForm.appendChild(feedbackTextarea);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit Feedback';
    feedbackForm.appendChild(submitButton);

    // Display feedback form
    feedbackForm.style.display = 'flex';

    // Add event listener for the submit button (optional)
    submitButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent page reload
        const feedbackType = feedbackSelect.value;
        const feedbackText = feedbackTextarea.value;
        console.log(`Feedback Type: ${feedbackType}, Feedback: ${feedbackText}`);
        // Handle feedback submission here...
    });
});

