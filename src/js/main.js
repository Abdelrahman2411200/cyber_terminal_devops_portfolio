import { initBootScreen } from './boot-screen.js';
import { initNavbar } from './navbar.js';
import { initTerminal } from './terminal.js';
import { initScrollAnimations } from './scroll-animations.js';
import { initParticles } from './particles.js';
import { initPipelineAnimation } from './pipeline-animation.js';
import { initTypingEffect } from './typing-effect.js';
import { initK8sDiagram } from './k8s-diagram.js';
import { initGithubProjects } from './github-projects.js';

document.addEventListener('DOMContentLoaded', () => {
    initBootScreen();
    initNavbar();
    initTerminal();
    initScrollAnimations();
    initParticles();
    initPipelineAnimation();
    initTypingEffect();
    initK8sDiagram();
    initGithubProjects();
    
    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
