import { initBootScreen } from './boot-screen.js';
import { initNavbar } from './navbar.js';
import { initTerminal } from './terminal.js';
import { initScrollAnimations } from './scroll-animations.js';
import { initTypingEffect } from './typing-effect.js';
import { initK8sDiagram } from './k8s-diagram.js';
import { initParticles } from './particles.js';
import { initPipelineAnimation } from './pipeline-animation.js';

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Initialize components
    initBootScreen();
    initNavbar();
    initTerminal();
    initScrollAnimations();
    initTypingEffect();
    initK8sDiagram();
    initParticles();
    initPipelineAnimation();
});
