// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('header nav');
    const body = document.body;
    
    // Create menu overlay element
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    body.appendChild(menuOverlay);
    
    // Toggle menu function
    function toggleMenu() {
        hamburgerMenu.classList.toggle('active');
        nav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    }
    
    // Event listeners for menu toggle
    hamburgerMenu.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a nav link
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        observer.observe(card);
    });

    // Update copyright year
    const currentYear = new Date().getFullYear();
    const copyrightEl = document.querySelector('.footer-bottom p');
    if (copyrightEl) {
        copyrightEl.textContent = copyrightEl.textContent.replace('2023', currentYear);
    }
}); 

function getTodayString() {
    const now = new Date();
    return now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate();
}

const today = getTodayString();
    // --- Affiliate Alert: Show only once per day ---
const affiliateAlertLastShown = localStorage.getItem('affiliateAlertLastShown');
if (affiliateAlertLastShown !== today) {
    alert("This website uses affiliate links. If you make a purchase through these links, we may earn a commission at no extra cost to you. Thank you for your support!");
    localStorage.setItem('affiliateAlertLastShown', today);
}