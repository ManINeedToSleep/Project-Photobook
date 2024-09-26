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




// Function to set up the feedback form
const setupFeedbackForm = () => {
  const feedbackForm = document.getElementById('feedbackForm');
  feedbackForm.style.display = 'flex';

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

  const feedbackTextarea = document.createElement('textarea');
  feedbackTextarea.placeholder = 'Enter your feedback here...';
  feedbackForm.appendChild(feedbackTextarea);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit Feedback';
  feedbackForm.appendChild(submitButton);

  submitButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent page reload
    const feedbackType = feedbackSelect.value;
    const feedbackText = feedbackTextarea.value;
    console.log(`Feedback Type: ${feedbackType}, Feedback: ${feedbackText}`);
    // Handle feedback submission here...
  });
};
