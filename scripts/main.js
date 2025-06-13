document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.querySelector('.overlay-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
    });
  }

  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  const specialsTitle = document.getElementById('specials-title');
  const specialsList = document.getElementById('specials-list');

  if (specialsTitle && specialsList) {
    // Fetch the specials list from the assets folder
    fetch('assets/specials.txt')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
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
        specialsTitle.textContent = 'Specials Unavailable';
      });
  }
});
