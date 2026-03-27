/* src/js/terminal.js */

export function initTerminal() {
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    
    if (!termInput || !termOutput) return;

    // Allow clicking anywhere on terminal to focus input
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        terminalBody.addEventListener('click', () => {
            termInput.focus();
        });
    }

    const commandHistory = [];
    let historyIndex = -1;

    // Command responses mapped
    const commands = {
        'help': `
Available commands:
  <span class="text-green">whoami</span>        - Display basic info
  <span class="text-green">skills</span>        - Show tech stack
  <span class="text-green">experience</span>    - List work history
  <span class="text-green">projects</span>      - View recent projects
  <span class="text-cyan">kubectl get pods</span> - Check cluster status
  <span class="text-cyan">terraform plan</span>   - View infra changes
  <span class="text-cyan">docker ps</span>        - List containers
  <span class="text-magenta">clear</span>         - Clear terminal output
`,
        'whoami': `
<span class="text-green">Abdelrahman Mohamed</span>
Role: DevOps Engineer
Focus: Infrastructure as Code, CI/CD, Containerization, Cloud Architecture.
Passion: Building scalable, resilient, and automated systems.
`,
        'skills': `
<span class="text-cyan">[Containers/Orchestration]</span> Docker, Kubernetes
<span class="text-cyan">[Infrastructure as Code]</span> Terraform
<span class="text-cyan">[CI/CD]</span> GitLab CI, GitHub Actions, Jenkins
<span class="text-cyan">[Cloud Providers]</span> AWS, Digital Ocean, Azure
<span class="text-cyan">[Monitoring]</span> Prometheus, Grafana, ELK
`,
        'experience': `
Currently orchestrating robust infrastructure... 
(Scroll down to Experience section for full timeline)
`,
        'projects': `
1. CN Banking System - Complete Microservices Architecture
2. CI/CD Automated Pipelines Hub
3. High Availability K8s Cluster Setup
(Scroll to Projects section to view details)
`,
        'kubectl get pods': `
<span class="text-muted">NAME                               READY   STATUS    RESTARTS   AGE</span>
<span class="text-green">auth-service-75b8c9d469-kl8m2</span>      1/1     Running   0          5d
<span class="text-green">payment-gateway-86fcf7cc5b-pq9x1</span>   1/1     Running   0          3d
<span class="text-green">user-dashboard-6bd79f7bd-vnm2z</span>     2/2     Running   0          12h
<span class="text-green">notification-hub-5f4c54b6d4-8jhl1</span>  1/1     Running   0          5d
<span class="text-green">redis-cache-master-0</span>               1/1     Running   0          14d
`,
        'terraform plan': `
<span class="text-cyan">Acquiring state lock. This may take a few moments...</span>

Terraform used the selected providers to generate the following execution plan.
Resource actions are indicated with the following symbols:
  <span class="text-green">+</span> create
  <span class="text-cyan">~</span> update in-place

Terraform will perform the following actions:

<span class="text-green">+</span> resource "aws_eks_cluster" "portfolio_cluster" {
      capacity_type = "ON_DEMAND"
      instance_types = ["t3.medium"]
      scaling_config {
          desired_size = 3
          max_size     = 5
          min_size     = 2
      }
  }

<span class="text-green">Plan: 1 to add, 0 to change, 0 to destroy.</span>
`,
        'docker ps': `
CONTAINER ID   IMAGE                 COMMAND                  CREATED        STATUS        PORTS                                       NAMES
c482a5cbe491   nginx:alpine          "/docker-entrypoint.…"   2 hours ago    Up 2 hours    0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   web_proxy
8d1234b3e8a4   postgres:14-alpine    "docker-entrypoint.s…"   2 days ago     Up 2 days     5432/tcp                                   db_primary
a3f124cbf5e2   redis:alpine          "docker-entrypoint.s…"   5 days ago     Up 5 days     6379/tcp                                   cache_layer
`
    };

    termInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const val = this.value.trim().toLowerCase();
            if (val) {
                commandHistory.push(val);
                historyIndex = commandHistory.length;
                processCommand(val);
            }
            this.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                this.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                this.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                this.value = '';
            }
        }
    });

    function processCommand(cmd) {
        // Echo command
        const promptLine = document.createElement('div');
        promptLine.innerHTML = `<span class="text-green">abdelrahman@devops</span>:<span class="text-cyan">~</span>$ ${cmd}`;
        promptLine.className = 'mb-1';
        termOutput.appendChild(promptLine);

        // Process output
        if (cmd === 'clear') {
            termOutput.innerHTML = '';
            return;
        }

        const outLine = document.createElement('div');
        outLine.className = 'mb-3';
        
        // Exact match or partial match for Easter eggs
        let response = commands[cmd];
        
        if (!response) {
            response = 'bash: ' + cmd + ': command not found. Type <span class="text-cyan">[help]</span> to see available commands.';
        }

        // Typewriter effect for output or immediate?
        // Immediate is better for UX, except for boot.
        outLine.innerHTML = response;
        termOutput.appendChild(outLine);

        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
}
