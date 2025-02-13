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
        }
    });
});