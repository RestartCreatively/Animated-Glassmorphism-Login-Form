document.addEventListener('DOMContentLoaded', function() {
  const passwordInputs = document.querySelectorAll('input[type="password"]:not([placeholder="Confirm Password"])');
  
  passwordInputs.forEach(passwordInput => {
    const strengthMeter = document.createElement('div');
    strengthMeter.className = 'password-strength';
    strengthMeter.innerHTML = `
      <div class="strength-meter"></div>
      <div class="password-strength-text"></div>
    `;
    
    const inputBox = passwordInput.closest('.input-box');
    inputBox.appendChild(strengthMeter);
    
    const strengthText = strengthMeter.querySelector('.password-strength-text');
    
    passwordInput.addEventListener('input', function() {
      const password = passwordInput.value;
      const strength = calculatePasswordStrength(password);
      updateStrengthMeter(strengthMeter, strengthText, password);
    });
  });
  
  function calculatePasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length > 0) strength += 1;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return Math.min(strength, 4);
  }
  
  function updateStrengthMeter(meter, text, password) {
    if (password.length === 0) {
      meter.style.display = 'none';
      return;
    }
    
    meter.style.display = 'block';
    meter.className = 'password-strength';
    
    const strength = calculatePasswordStrength(password);
    let strengthClass = '';
    let strengthMessage = '';
    
    switch(strength) {
      case 0:
      case 1:
        strengthClass = 'weak';
        strengthMessage = 'Weak password';
        break;
      case 2:
        strengthClass = 'medium';
        strengthMessage = 'Medium password';
        break;
      case 3:
        strengthClass = 'strong';
        strengthMessage = 'Strong password';
        break;
      case 4:
        strengthClass = 'very-strong';
        strengthMessage = 'Very strong password';
        break;
    }
    
    meter.classList.add(strengthClass);
    text.textContent = strengthMessage;
  }
});