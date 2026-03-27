/* src/js/typing-effect.js */

export function initTypingEffect() {
    const subtitles = [
        "Infrastructure as Code",
        "CI/CD Automation",
        "Cloud Architecture",
        "Kubernetes Orchestration"
    ];
    
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newWordDelay = 2000;

    function type() {
        const currentWord = subtitles[wordIndex];
        
        if (isDeleting) {
            charIndex--;
            typingElement.textContent = currentWord.substring(0, charIndex);
        } else {
            charIndex++;
            typingElement.textContent = currentWord.substring(0, charIndex);
        }

        let typeSpeed = isDeleting ? erasingDelay : typingDelay;

        // Randomize typing speed slightly for realism
        if (!isDeleting) {
            typeSpeed += Math.random() * 50 - 25;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Word finished typing
            typeSpeed = newWordDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word finished deleting
            isDeleting = false;
            wordIndex = (wordIndex + 1) % subtitles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect after a short delay (e.g. after boot screen)
    document.addEventListener('bootComplete', () => {
        setTimeout(type, 1000);
    });
}
