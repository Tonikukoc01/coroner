// Add this script to enhance mobile responsiveness while preserving animations

document.addEventListener('DOMContentLoaded', function() {
    // Mobile detection
    const isMobile = window.innerWidth <= 768;
    
    // Mobile-specific adjustments
    if (isMobile) {
        // Adjust scroll indicator position
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.marginLeft = '0';
        }
        
        // Make side menu full width on mobile
        const sideMenu = document.querySelector('.side-menu');
        if (sideMenu) {
            sideMenu.addEventListener('click', function(e) {
                // Close menu when clicking anywhere except navigation items
                if (e.target === sideMenu) {
                    sideMenu.classList.remove('active');
                }
            });
        }
        
        // Optimize animations for mobile performance
        document.querySelectorAll('.about-collaboration-image, .horizontal-line, .about-subheader, .about-subheader1, .collaboration-btn').forEach(element => {
            // Change transform direction for image on mobile
            if (element.classList.contains('about-collaboration-image')) {
                element.style.transform = 'translateY(50px)';
            }
        });
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        // Force recalculation of animation elements
        setTimeout(function() {
            handleScrollAnimations();
            
            // Update layout adjustments
            const isMobile = window.innerWidth <= 768;
            document.body.classList.toggle('mobile-view', isMobile);
            
            // Adjust scroll indicator
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                scrollIndicator.style.marginLeft = isMobile ? '0' : '250px';
            }
        }, 200);
    });
    
    // Enhanced scroll animation handler for better mobile performance
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.about-collaboration-image, .horizontal-line, .about-subheader, .about-subheader1, .collaboration-btn');
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            // Lower trigger point for mobile to ensure animations happen
            const triggerPoint = window.innerHeight * (window.innerWidth <= 768 ? 0.9 : 0.8);
            
            if (elementTop < triggerPoint) {
                element.classList.add('visible');
            }
        });
    }
    
    // Optimize scroll event with requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check for elements already in view
    handleScrollAnimations();
});
