/* src/js/scroll-animations.js */

export function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    // Setup intersection observer
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Handle initial reveal after boot screen
    document.addEventListener('bootComplete', () => {
        setTimeout(() => {
            document.querySelectorAll('.hero .reveal').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('active');
                }, index * 200); // Stagger
            });
        }, 100);
    });
}
