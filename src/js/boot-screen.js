/* src/js/boot-screen.js */

export function initBootScreen() {
    const bootScreen = document.getElementById('boot-screen');
    const terminalContent = bootScreen.querySelector('.terminal-content');
    
    if (!bootScreen || !terminalContent) return;

    const bootSequence = [
        { text: "Initializing kernel parameters...", delay: 200 },
        { text: "Mounting core filesystems...", delay: 300, status: "[OK]" },
        { text: "Loading devops-portfolio-env modules...", delay: 400, status: "[OK]" },
        { text: "Starting network interfaces...", delay: 200, status: "[OK]" },
        { text: "Verifying user identity: Abdelrahman Mohamed...", delay: 500, status: "[OK]" },
        { text: "Establishing secure connection to portfolio domain...", delay: 300, status: "[OK]" },
        { text: "System Boot Complete v.2.0.26", delay: 400 },
        { text: "> Entering main interface...", delay: 600 }
    ];

    let currentLine = 0;

    function addLine() {
        if (currentLine >= bootSequence.length) {
            setTimeout(() => {
                bootScreen.classList.add('hidden');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
                
                // Trigger hero typing animation if it exists
                document.dispatchEvent(new Event('bootComplete'));
            }, 800);
            return;
        }

        const lineData = bootSequence[currentLine];
        const p = document.createElement('p');
        
        if (lineData.status) {
            p.innerHTML = `<span style="color: var(--cyber-cyan);">${lineData.status}</span> ${lineData.text}`;
        } else {
            p.textContent = lineData.text;
        }

        terminalContent.appendChild(p);
        currentLine++;

        setTimeout(addLine, lineData.delay);
    }

    // Freeze body scroll during boot
    document.body.style.overflow = 'hidden';
    
    // Start sequence
    setTimeout(addLine, 500);
}
