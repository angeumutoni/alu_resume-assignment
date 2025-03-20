// Enable smooth scrolling for all navigation links that point to page sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu variables
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

// Toggle mobile menu when hamburger icon is clicked
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
});

// Close mobile menu when a navigation link is clicked and scroll to section
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Close mobile menu when clicking outside of it
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Handle contact form submission and show success message
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent successfully!');
    this.reset();
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Load saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

// Switch between light and dark themes when toggle button is clicked
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
});

// Multi-step form variables
let currentStep = 'name';
const steps = ['name', 'email', 'message'];

// Validate email format using regex
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Display error message for form fields
function showError(stepId, message) {
    const errorElement = document.getElementById(`${stepId}Error`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Hide error message for form fields
function hideError(stepId) {
    const errorElement = document.getElementById(`${stepId}Error`);
    errorElement.style.display = 'none';
}

// Update progress dots in multi-step form
function updateDots(stepIndex) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === stepIndex);
    });
}

// Move to next step in form after validation
function nextStep(currentStepId) {
    const currentInput = document.getElementById(`${currentStepId}Input`);
    
    if (!currentInput.value.trim()) {
        showError(currentStepId, `Please enter your ${currentStepId}`);
        return;
    }

    if (currentStepId === 'email' && !validateEmail(currentInput.value)) {
        showError('email', 'Please enter a valid email address');
        return;
    }

    hideError(currentStepId);
    
    const currentIndex = steps.indexOf(currentStepId);
    if (currentIndex < steps.length - 1) {
        document.getElementById(`${currentStepId}Step`).classList.remove('active');
        document.getElementById(`${steps[currentIndex + 1]}Step`).classList.add('active');
        currentStep = steps[currentIndex + 1];
        updateDots(currentIndex + 1);
    }
}

// Move to previous step in form
function prevStep(currentStepId) {
    const currentIndex = steps.indexOf(currentStepId);
    if (currentIndex > 0)
