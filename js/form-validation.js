document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm(this)) {
        // Form is valid, proceed with submission
        console.log('Form is valid, submitting...');
        // this.submit(); // Uncomment to enable actual form submission
      }
    });
  });
  
  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
      const inputBox = input.closest('.input-box');
      const errorMsg = inputBox.querySelector('.error-message');
      
      // Reset error state
      input.classList.remove('error');
      if (errorMsg) errorMsg.style.display = 'none';
      
      // Validate based on input type
      if (!input.value.trim()) {
        showError(input, 'This field is required');
        isValid = false;
      } else if (input.type === 'email' && !validateEmail(input.value)) {
        showError(input, 'Please enter a valid email');
        isValid = false;
      } else if (input.id === 'password' && !validatePassword(input.value)) {
        showError(input, 'Password must be at least 8 characters');
        isValid = false;
      } else if (input.placeholder === 'Confirm Password') {
        const password = form.querySelector('#password').value;
        if (input.value !== password) {
          showError(input, 'Passwords do not match');
          isValid = false;
        }
      }
    });
    
    return isValid;
  }
  
  function showError(input, message) {
    const inputBox = input.closest('.input-box');
    input.classList.add('error');
    
    let errorMsg = inputBox.querySelector('.error-message');
    if (!errorMsg) {
      errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      inputBox.appendChild(errorMsg);
    }
    
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
  }
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePassword(password) {
    return password.length >= 8;
  }
});