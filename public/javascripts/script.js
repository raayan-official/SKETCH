
      // JavaScript to hide the flash message after 1 second
      window.onload = function() {
        const flashMessages = document.querySelectorAll('.flash-message');
        flashMessages.forEach((message) => {
          setTimeout(() => {
            message.style.transition = "opacity 0.5s ease";
            message.style.opacity = "0";
            setTimeout(() => {
              message.style.display = "none";
            }, 500); // Wait for the fade-out transition to complete
          }, 1000); // Remove after 1 second
        });
      };



      // Toggle Mobile Menu
      const menuToggle = document.getElementById('menu-toggle');
      const mobileMenu = document.getElementById('mobile-menu');
    
      menuToggle.addEventListener('click', () => {
        const isVisible = mobileMenu.style.display === 'block';
        mobileMenu.style.display = isVisible ? 'none' : 'block';
      });