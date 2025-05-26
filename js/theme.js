document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'toggle-btn';
  toggleBtn.innerHTML = '<i class="bx bx-sun"></i>';
  toggleBtn.title = 'Toggle Dark/Light Mode';
  
  const themeText = document.createElement('span');
  themeText.className = 'theme-text';
  themeText.textContent = 'Dark Mode';
  
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  themeToggle.appendChild(toggleBtn);
  themeToggle.appendChild(themeText);
  document.body.appendChild(themeToggle);
  
  // Check for saved theme preference or use preferred color scheme
  const currentTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  
  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    toggleBtn.innerHTML = '<i class="bx bx-moon"></i>';
    themeText.textContent = 'Light Mode';
  }
  
  // Toggle theme on button click
  toggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    
    if (isLight) {
      localStorage.setItem('theme', 'light');
      toggleBtn.innerHTML = '<i class="bx bx-moon"></i>';
      themeText.textContent = 'Light Mode';
    } else {
      localStorage.setItem('theme', 'dark');
      toggleBtn.innerHTML = '<i class="bx bx-sun"></i>';
      themeText.textContent = 'Dark Mode';
    }
  });
  
  // Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    const newTheme = e.matches ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'light') {
      document.body.classList.add('light-mode');
      toggleBtn.innerHTML = '<i class="bx bx-moon"></i>';
      themeText.textContent = 'Light Mode';
    } else {
      document.body.classList.remove('light-mode');
      toggleBtn.innerHTML = '<i class="bx bx-sun"></i>';
      themeText.textContent = 'Dark Mode';
    }
  });
});