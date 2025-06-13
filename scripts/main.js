const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
}

// Load specials from external text file
document.addEventListener('DOMContentLoaded', () => {
  const specialsTitle = document.getElementById('specials-title');
  const specialsList = document.getElementById('specials-list');

  if (specialsTitle && specialsList) {
    fetch('assets/specials.txt')
      .then((response) => response.text())
      .then((text) => {
        const lines = text.trim().split('\n');
        if (lines.length > 0) {
          specialsTitle.textContent = lines[0];
          lines.slice(1).forEach((line) => {
            const li = document.createElement('li');
            li.textContent = line;
            specialsList.appendChild(li);
          });
        }
      })
      .catch((err) => {
        console.error('Error loading specials:', err);
      });
  }
});
