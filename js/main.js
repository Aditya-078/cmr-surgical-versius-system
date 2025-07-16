// Main JavaScript for CMR Surgical Website Clone
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initCookieConsent();
    initBackToTop();
    initSearchModal();
    initImageErrorHandling();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    try {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                
                // Animate hamburger menu
                const hamburgers = navToggle.querySelectorAll('.hamburger');
                hamburgers.forEach((hamburger, index) => {
                    if (navMenu.classList.contains('active')) {
                        if (index === 0) hamburger.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        if (index === 1) hamburger.style.opacity = '0';
                        if (index === 2) hamburger.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        hamburger.style.transform = 'none';
                        hamburger.style.opacity = '1';
                    }
                });
            });
            
            // Close menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    const hamburgers = navToggle.querySelectorAll('.hamburger');
                    hamburgers.forEach(hamburger => {
                        hamburger.style.transform = 'none';
                        hamburger.style.opacity = '1';
                    });
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                    navMenu.classList.remove('active');
                    const hamburgers = navToggle.querySelectorAll('.hamburger');
                    hamburgers.forEach(hamburger => {
                        hamburger.style.transform = 'none';
                        hamburger.style.opacity = '1';
                    });
                }
            });
        }
    } catch (error) {
        console.error('Error initializing mobile navigation:', error);
    }
}

// Cookie Consent Banner
function initCookieConsent() {
    try {
        const cookieBanner = document.getElementById('cookie-banner');
        const acceptAllBtn = document.getElementById('accept-all');
        const cookieSettingsBtn = document.getElementById('cookie-settings');
        
        if (cookieBanner) {
            // Check if user has already consented
            const hasConsented = localStorage.getItem('cookieConsent');
            
            if (!hasConsented) {
                // Show banner after a short delay
                setTimeout(() => {
                    cookieBanner.classList.add('visible');
                }, 1000);
            }
            
            // Accept all cookies
            if (acceptAllBtn) {
                acceptAllBtn.addEventListener('click', function() {
                    try {
                        localStorage.setItem('cookieConsent', 'accepted');
                        cookieBanner.classList.remove('visible');
                    } catch (storageError) {
                        console.warn('Could not save cookie consent to localStorage:', storageError);
                        cookieBanner.classList.remove('visible');
                    }
                });
            }
            
            // Cookie settings (placeholder functionality)
            if (cookieSettingsBtn) {
                cookieSettingsBtn.addEventListener('click', function() {
                    alert('Cookie settings functionality would be implemented here in a full application.');
                });
            }
        }
    } catch (error) {
        console.error('Error initializing cookie consent:', error);
    }
}

// Back to Top Button
function initBackToTop() {
    try {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (backToTopBtn) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            // Smooth scroll to top
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    } catch (error) {
        console.error('Error initializing back to top button:', error);
    }
}

// Search Modal
function initSearchModal() {
    try {
        const searchModal = document.getElementById('search-modal');
        const searchClose = document.getElementById('search-close');
        const searchForm = searchModal ? searchModal.querySelector('.search-form') : null;
        
        // Note: Search trigger would typically be added to a search button in the header
        // For now, we'll just handle the close functionality
        
        if (searchClose && searchModal) {
            searchClose.addEventListener('click', function() {
                searchModal.classList.remove('visible');
            });
            
            // Close modal when clicking outside
            searchModal.addEventListener('click', function(event) {
                if (event.target === searchModal) {
                    searchModal.classList.remove('visible');
                }
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && searchModal.classList.contains('visible')) {
                    searchModal.classList.remove('visible');
                }
            });
        }
        
        // Handle search form submission
        if (searchForm) {
            searchForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const searchInput = searchForm.querySelector('input[type="search"]');
                const searchTerm = searchInput ? searchInput.value.trim() : '';
                
                if (searchTerm) {
                    // In a real application, this would perform an actual search
                    alert(`Search functionality would be implemented here. Search term: "${searchTerm}"`);
                    searchModal.classList.remove('visible');
                    searchInput.value = '';
                } else {
                    alert('Please enter a search term.');
                }
            });
        }
    } catch (error) {
        console.error('Error initializing search modal:', error);
    }
}

// Image Error Handling
function initImageErrorHandling() {
    try {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                // Create a placeholder div with text
                const placeholder = document.createElement('div');
                placeholder.style.cssText = `
                    width: 100%;
                    height: 200px;
                    background-color: #f8f9fa;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666;
                    font-size: 14px;
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                `;
                placeholder.textContent = 'Image not available';
                
                // Replace the broken image with the placeholder
                if (this.parentNode) {
                    this.parentNode.replaceChild(placeholder, this);
                }
            });
        });
    } catch (error) {
        console.error('Error initializing image error handling:', error);
    }
}

// Utility function to add smooth scrolling to anchor links
function initSmoothScrolling() {
    try {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    event.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error initializing smooth scrolling:', error);
    }
}

// Initialize smooth scrolling
document.addEventListener('DOMContentLoaded', initSmoothScrolling);

// Add loading animation for better UX
function showLoadingState() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
}

function hideLoadingState() {
    document.body.style.opacity = '1';
}

// Show loading state initially
showLoadingState();

// Hide loading state when everything is loaded
window.addEventListener('load', function() {
    setTimeout(hideLoadingState, 100);
});

// Handle form submissions (for contact forms, etc.)
function initFormHandling() {
    try {
        const forms = document.querySelectorAll('form:not(.search-form)');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Basic form validation
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = '#e91e63';
                    } else {
                        field.style.borderColor = '';
                    }
                });
                
                if (isValid) {
                    // In a real application, this would submit the form data
                    alert('Form submitted successfully! (This is a demo)');
                    form.reset();
                } else {
                    alert('Please fill in all required fields.');
                }
            });
        });
    } catch (error) {
        console.error('Error initializing form handling:', error);
    }
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', initFormHandling);

// Add intersection observer for animations
function initScrollAnimations() {
    try {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.feature-section, .news-item, .publication-item');
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    } catch (error) {
        console.error('Error initializing scroll animations:', error);
    }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);
