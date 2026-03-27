/* src/js/k8s-diagram.js */

export function initK8sDiagram() {
    const k8sContainer = document.querySelector('.k8s-diagram');
    if (!k8sContainer) return;
    
    const pods = document.querySelectorAll('.k8s-pod');
    const nodes = document.querySelectorAll('.k8s-node');
    const logs = document.getElementById('k8s-logs');
    
    if (!pods.length || !nodes.length || !logs) return;

    const logMessages = [
        "Scheduling pod on worker-node-1...",
        "Pulling image from ECR...",
        "Successfully pulled image.",
        "Created container app-container",
        "Started container app-container",
        "Readiness probe successful",
        "Liveness probe successful",
        "Serving traffic",
        "Autoscaling triggered: CPU threshold > 80%",
        "Scaling replicas: 3 -> 4"
    ];

    let logIndex = 0;

    function appendLog() {
        if (logIndex >= logMessages.length) logIndex = 0;
        
        const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
        const p = document.createElement('p');
        p.innerHTML = `<span class="text-muted">[${timestamp}]</span> ${logMessages[logIndex]}`;
        
        logs.appendChild(p);
        
        // Keep only last 5 logs
        if (logs.children.length > 5) {
            logs.removeChild(logs.firstChild);
        }
        
        logIndex++;
        
        // Randomly pulse a node and some pods
        const randomNodeIndex = Math.floor(Math.random() * nodes.length);
        nodes[randomNodeIndex].classList.add('pulse-border');
        
        pods.forEach(pod => {
            if (Math.random() > 0.5) {
                pod.classList.add('pulse-active');
            }
        });
        
        setTimeout(() => {
            nodes[randomNodeIndex].classList.remove('pulse-border');
            pods.forEach(pod => pod.classList.remove('pulse-active'));
        }, 800);
    }

    // Append log every 2.5 seconds
    setInterval(appendLog, 2500);
}
