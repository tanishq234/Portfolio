document.addEventListener("DOMContentLoaded", function() {
    // Typed.js for typing animation
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        new Typed(typedTextSpan, {
            strings: ['Software Developer', 'Data Scientist', 'ML Engineer', 'Problem Solver'],
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }

    // AOS for scroll animations
    AOS.init({
        offset: 50, // Smaller offset to trigger animations sooner
        duration: 1000,
        easing: 'ease-in-out', // Smoother animation curve
        once: true, // Only animate once
        mirror: false, // Do not animate out when scrolling up
    });

    // Hamburger menu functionality
    window.hamburg = function() {
        document.querySelector(".dropdown").style.transform = "translateY(0px)";
    };

    window.cancel = function() {
        document.querySelector(".dropdown").style.transform = "translateY(-500px)";
    };

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu if open
            const dropdown = document.querySelector(".dropdown");
            if (dropdown && dropdown.style.transform === "translateY(0px)") {
                dropdown.style.transform = "translateY(-500px)";
            }
        });
    });

    // Skill bar animation on scroll
    const skillsSection = document.getElementById('skills');
    const progressFills = document.querySelectorAll('.progress-fill');

    function animateSkillBars() {
        progressFills.forEach(fill => {
            const progress = fill.getAttribute('data-progress');
            fill.style.width = progress;
        });
    }

    // Observer to trigger skill bar animation when skills section is in view
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    if (skillsSection) {
        observer.observe(skillsSection);
    }
});