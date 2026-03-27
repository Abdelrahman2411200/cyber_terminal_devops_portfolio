/* src/js/pipeline-animation.js */

export function initPipelineAnimation() {
    const pipelineStages = document.querySelectorAll('.pipeline-stage');
    if (!pipelineStages.length) return;
    
    let currentStage = 0;
    
    function animatePipeline() {
        // Reset all
        pipelineStages.forEach(stage => {
            stage.classList.remove('active', 'completed', 'error');
            const icon = stage.querySelector('.stage-icon');
            if (icon) icon.className = 'stage-icon waiting';
        });
        
        currentStage = 0;
        processNextStage();
    }
    
    function processNextStage() {
        if (currentStage >= pipelineStages.length) {
            // Pipeline complete, restart after a delay
            setTimeout(animatePipeline, 5000);
            return;
        }
        
        const stage = pipelineStages[currentStage];
        stage.classList.add('active');
        
        const icon = stage.querySelector('.stage-icon');
        if (icon) {
            icon.className = 'stage-icon running';
            // Simple spinner via CSS or innerHTML
            icon.innerHTML = '⟳'; 
        }
        
        // Random processing time between 1-3 seconds
        const processingTime = Math.random() * 2000 + 1000;
        
        setTimeout(() => {
            stage.classList.remove('active');
            stage.classList.add('completed');
            
            if (icon) {
                icon.className = 'stage-icon success text-green';
                icon.innerHTML = '✓';
            }
            
            currentStage++;
            
            // Small delay before next stage to show data flowing
            setTimeout(processNextStage, 500);
            
        }, processingTime);
    }
    
    // Start animation when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ensure it only starts once
                if (!pipelineStages[0].hasAttribute('data-started')) {
                    pipelineStages[0].setAttribute('data-started', 'true');
                    setTimeout(animatePipeline, 1000);
                }
            }
        });
    });
    
    const pipelineContainer = document.querySelector('.pipeline-container');
    if (pipelineContainer) {
        observer.observe(pipelineContainer);
    }
}
