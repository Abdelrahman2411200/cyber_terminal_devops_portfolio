// src/js/github-projects.js

export async function initGithubProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    // 1. Render Initial Skeletons
    grid.innerHTML = Array(3).fill(`
        <div class="glass-card project-card skeleton" style="min-height: 250px;">
            <div class="project-content">
                <div class="skeleton-title mb-1"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text w-75"></div>
                <div class="project-tags mt-2">
                    <span class="skeleton-badge"></span>
                    <span class="skeleton-badge"></span>
                    <span class="skeleton-badge"></span>
                </div>
            </div>
        </div>
    `).join('');

    try {
        const res = await fetch('/api/projects');
        
        if (!res.ok) {
            let errMsg = `GitHub API Error (${res.status})`;
            try {
                const errData = await res.json();
                if (errData.error) errMsg = errData.error;
            } catch (e) {}
            throw new Error(errMsg);
        }
        
        const projects = await res.json();
        
        if (!projects || projects.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center text-muted" style="grid-column: 1 / -1; padding: 3rem;">
                    <p class="font-mono">>_ Looking for repositories... Currently no public repositories tagged with 'portfolio'.</p>
                </div>
            `;
            return;
        }

        // Render project cards
        grid.innerHTML = projects.map(proj => {
            // Badges HTML
            let badgesHtml = '';
            if (proj.language) {
                badgesHtml += `<span class="badge" style="border-color: var(--cyber-cyan); color: var(--cyber-cyan);">${proj.language}</span>`;
            }
            if (proj.topics && proj.topics.length > 0) {
                badgesHtml += proj.topics.slice(0, 4).map(t => `<span class="badge">${t}</span>`).join('');
            }

            // Featured styling
            const featuredClass = proj.isFeatured ? 'featured-project' : '';
            const featuredBadge = proj.isFeatured ? `<div class="font-mono text-cyan text-xs mb-1" style="letter-spacing:1px;">★ FEATURED</div>` : '';

            // Format updated date
            const dateObj = new Date(proj.updatedAt);
            const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

            return `
                <div class="glass-card project-card ${featuredClass}" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div class="project-content">
                        ${featuredBadge}
                        <h4 class="project-title mb-1">${proj.displayName}</h4>
                        <p class="project-desc" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                            ${proj.description || 'DevOps and Cloud Engineering Repository.'}
                        </p>
                        <div class="project-tags mt-2">
                            ${badgesHtml}
                        </div>
                    </div>
                    <div class="project-footer mt-3 flex justify-between items-center" style="border-top: 1px solid rgba(0, 255, 140, 0.1); padding-top: 1rem; margin-top: auto;">
                        <div class="text-xs text-muted font-mono">
                            <span class="text-yellow">★</span> ${proj.stars} &nbsp;|&nbsp; Upd: ${dateStr}
                        </div>
                        <div class="flex gap-1" style="gap: 10px;">
                            ${proj.liveUrl ? `<a href="${proj.liveUrl}" target="_blank" class="text-green hover-cyan text-xs font-mono" style="text-decoration:none;">[LIVE]</a>` : ''}
                            <a href="${proj.githubUrl}" target="_blank" class="text-cyan hover-green text-xs font-mono" style="text-decoration:none;">[REPO]</a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Re-trigger intersection observer for newly added cards so they animate gracefully
        const observer = window.getScrollObserver ? window.getScrollObserver() : null;
        if (observer) {
            document.querySelectorAll('#projects-grid .project-card').forEach(card => {
                card.classList.add('reveal');
                observer.observe(card);
            });
        }

    } catch (err) {
        console.error('Failed to init GitHub projects:', err);
        grid.innerHTML = `
            <div class="col-span-full text-center" style="grid-column: 1 / -1; padding: 2rem; border: 1px dashed var(--cyber-pink); border-radius: 8px; background: rgba(255, 0, 128, 0.05);">
                <p class="text-pink font-mono mb-1">Connection Error: ${err.message}</p>
                <button onclick="window.location.reload()" class="btn btn-outline mt-1" style="padding: 0.5rem 1rem; font-size: 0.8rem; border-color: var(--cyber-pink); color: var(--cyber-pink);">Retry Connection</button>
            </div>
        `;
    }
}
