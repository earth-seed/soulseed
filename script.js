window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const navLines = document.querySelectorAll('.nav-line-horizontal');
    const overlay = document.querySelector('#blur-overlay');
    
    const navTop = nav.getBoundingClientRect().top;
    const lastLineBottom = navLines[1].getBoundingClientRect().bottom;
    
    // Update overlay height to exactly match the nav's top line
    overlay.style.height = `${lastLineBottom}px`;
});

// Add resize listener for responsive behavior
window.addEventListener('resize', () => {
    const nav = document.querySelector('nav');
    const navLines = document.querySelectorAll('.nav-line-horizontal');
    const overlay = document.querySelector('#blur-overlay');
    
    const navTop = nav.getBoundingClientRect().top;
    const lastLineBottom = navLines[1].getBoundingClientRect().bottom;
    
    overlay.style.height = `${lastLineBottom}px`;
});

// Initialize Swiper
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.querySelector('.menu-open');
    const menuCloseIcon = document.querySelector('.menu-close');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
            menuOpenIcon.classList.toggle('hidden');
            menuCloseIcon.classList.toggle('hidden');
        });
    }

    // Close mobile menu on window resize if open
    const originalResizeHandler = window.onresize;
    window.onresize = function(e) {
        if (originalResizeHandler) originalResizeHandler(e);
        
        if (window.innerWidth >= 1024 && mobileMenu?.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            menuOpenIcon?.classList.remove('hidden');
            menuCloseIcon?.classList.add('hidden');
        }
    };

    // Handle volunteer form submission
    const form = document.getElementById('volunteer-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent form submission
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = 'Gönderiliyor...';
            submitButton.disabled = true;

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('about').value
            };

            try {
                // Send the form data
                const response = await fetch('https://script.google.com/macros/s/AKfycbwAwesr0jfJe8NDKqt11y4vzdiJM7VzywNCqhbQtvTnAV-UPVMUSkG70Y9Soi8-oytR/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                // Show success message
                const successMessage = document.getElementById('success-message');
                successMessage.classList.remove('hidden');
                form.classList.add('hidden');
                
                // Reset form
                form.reset();
                
                // Hide success message and show form again after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                    form.classList.remove('hidden');
                }, 5000);
            } catch (error) {
                // Show error message
                alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Handle newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Show loading state
            const submitButton = document.getElementById('newsletter-submit');
            const originalIcon = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin text-xl"></i>';
            submitButton.disabled = true;

            // Get form data
            const formData = {
                email: document.getElementById('newsletter-email').value,
                type: 'newsletter'
            };

            try {
                // Send the form data
                const response = await fetch('https://script.google.com/macros/s/AKfycbwAwesr0jfJe8NDKqt11y4vzdiJM7VzywNCqhbQtvTnAV-UPVMUSkG70Y9Soi8-oytR/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                // Show success message
                const successMessage = document.getElementById('newsletter-success-message');
                successMessage.classList.remove('hidden');
                newsletterForm.classList.add('hidden');
                
                // Reset form
                newsletterForm.reset();
                
                // Hide success message and show form again after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                    newsletterForm.classList.remove('hidden');
                }, 5000);
            } catch (error) {
                // Show error message
                alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
                console.error('Newsletter form submission error:', error);
            } finally {
                // Reset button state
                submitButton.innerHTML = originalIcon;
                submitButton.disabled = false;
            }
        });
    }
});