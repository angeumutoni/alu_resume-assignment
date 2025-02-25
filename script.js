document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump behavior

        const targetId = this.getAttribute('href').substring(1); // Get target ID
        const targetElement = document.getElementById(targetId); // Find target element

        if (targetElement) { // Check if element exists
          window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
          });
        }
    });
});
