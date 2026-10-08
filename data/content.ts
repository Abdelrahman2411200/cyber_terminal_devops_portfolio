export interface Project {
  id: string;
  title: string;
  category: 'Backend' | 'DevOps' | 'Full-Stack' | 'AI';
  summary: string;
  description: string;
  techStack: string[];
  highlights: string[];
  architectureSummary?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface AcademicProject {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  keyTakeaway: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    rotatingTitles: string[];
    headline: string;
    subheadline: string;
    bio: string[];
    location: string;
    email: string;
    github: string;
    linkedin: string;
    cvPath: string;
    education: {
      degree: string;
      institution: string;
      graduationYear: string;
      status: string;
      highlights: string[];
    };
    softSkills: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  skills: SkillCategory[];
  featuredProjects: Project[];
  academicProjects: AcademicProject[];
  architectureShowcase: {
    title: string;
    subtitle: string;
    systemDescription: string;
    nodes: {
      id: string;
      name: string;
      layer: 'Gateway' | 'Core Microservices' | 'Event Bus & Storage' | 'Observability';
      tech: string;
      description: string;
      details: string[];
    }[];
    flows: {
      from: string;
      to: string;
      label: string;
    }[];
  };
}

export const portfolioContent: PortfolioData = {
  personal: {
    name: "Abdelrahman Mohamed Ahmed",
    title: "Software Engineer & DevOps Engineer",
    rotatingTitles: [
      "Software Engineer",
      "DevOps Engineer",
      "Cloud-Native Architect",
      "Distributed Systems Enthusiast"
    ],
    headline: "Building resilient, cloud-native distributed systems from backend microservices to production Kubernetes.",
    subheadline: "Computer Engineering fresh graduate (2026) specializing in high-throughput Java/Spring Boot & Python/FastAPI microservices, scalable React/TypeScript frontends, and automated CI/CD with Kubernetes, Terraform & Observability.",
    bio: [
      "I am a passionate Software & DevOps Engineer who bridges the gap between software design and production cloud infrastructure. I architect and build enterprise-grade microservices using Java/Spring Boot, Python/FastAPI, and TypeScript, backed by robust transactional patterns (Outbox, Saga, Distributed Ledgers).",
      "On the platform side, I orchestrate resilient cloud environments using Docker, Kubernetes (AWS EKS), Terraform, Kustomize, and end-to-end GitOps/CI/CD pipelines with automated security audits (Trivy, tfsec).",
      "I have a keen focus on deep observability (Prometheus, Grafana, Loki, OpenTelemetry, Jaeger) and high availability, ensuring systems are observable, secure, and self-healing under heavy load."
    ],
    location: "6th of October City, Giza, Egypt",
    email: "abdulrahmanmohamed256@gmail.com",
    github: "https://github.com/Abdelrahman2411200",
    linkedin: "https://www.linkedin.com/in/abdelrahman-mohamed-657b2b315",
    cvPath: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Abdelrahman_CV.pdf`,
    education: {
      degree: "B.Eng. in Computer Engineering",
      institution: "Modern Academy for Engineering and Technology",
      graduationYear: "2026",
      status: "Graduating 2026",
      highlights: [
        "Specialized in Distributed Systems, Operating Systems, Computer Networks & Cybersecurity",
        "Strong fundamentals in Data Structures, Algorithms, Machine Learning & Database Architectures"
      ]
    },
    softSkills: [
      {
        title: "Public Speaking & Technical Demos",
        description: "Proven ability to articulate complex distributed architectures and system designs clearly to cross-functional stakeholders.",
        icon: "Mic"
      },
      {
        title: "Technical Communication",
        description: "Clear architectural documentation, RFC writing, comprehensive API schemas, and interactive runbooks.",
        icon: "FileText"
      },
      {
        title: "Cross-Team Collaboration",
        description: "Experienced in aligning engineering teams across backend, DevOps, security, and product for high-velocity releases.",
        icon: "Users"
      }
    ]
  },
  skills: [
    {
      category: "Languages",
      icon: "Code2",
      skills: ["Java", "Python", "TypeScript", "JavaScript", "C", "MATLAB"]
    },
    {
      category: "Backend Engineering",
      icon: "Server",
      skills: ["Spring Boot", "Spring Security", "FastAPI", "NestJS", "Node.js / Express", "Spring Data JPA", "Hibernate"]
    },
    {
      category: "Frontend & UI",
      icon: "Layout",
      skills: ["React", "Vite", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts"]
    },
    {
      category: "Data & Messaging",
      icon: "Database",
      skills: ["PostgreSQL", "MySQL", "Redis (Caching/Queues)", "Apache Kafka", "Flyway Migrations", "Event Sourcing"]
    },
    {
      category: "Cloud & DevOps",
      icon: "Cloud",
      skills: ["Docker", "Kubernetes", "Terraform", "GitHub Actions CI/CD", "AWS / EKS", "Kustomize", "Trivy & tfsec Security Scanners"]
    },
    {
      category: "Observability & Telemetry",
      icon: "Activity",
      skills: ["Prometheus", "Grafana", "Grafana Loki", "OpenTelemetry (OTel)", "Jaeger Distributed Tracing"]
    },
    {
      category: "Testing & Quality",
      icon: "CheckCircle2",
      skills: ["Playwright", "Vitest", "JUnit 5", "Mockito", "Pytest", "Postman / Newman"]
    },
    {
      category: "Security & Networking",
      icon: "ShieldCheck",
      skills: ["JWT & OAuth2", "Network Segmentation", "Firewalls & Access Control", "TLS / mTLS", "Vulnerability Scanning"]
    }
  ],
  featuredProjects: [
    {
      id: "event-management-platform",
      title: "Event Management Platform",
      category: "Full-Stack",
      summary: "Distributed event orchestration suite built with Spring Boot microservices, Kafka transactional outbox, and full observability.",
      description: "A production-grade, highly scalable event and venue management platform engineered with decoupled Spring Boot microservices (API Gateway, Auth, Event, Venue, Attendee, Payment, and Notification services) and a React/TypeScript frontend.",
      techStack: ["Java 17", "Spring Boot", "Spring Security", "React", "TypeScript", "Kafka", "PostgreSQL", "Redis", "Docker", "Prometheus", "Grafana", "Loki", "OpenTelemetry", "Jaeger"],
      highlights: [
        "Implemented Transactional Outbox Pattern with Kafka to guarantee at-least-once message delivery without dual-write inconsistencies.",
        "Architected distributed Payment & Refund Saga with automated compensations, dead-letter queues (DLQ), and retry strategies.",
        "Engineered zero-trust JWT authentication and centralized rate limiting at the Spring Cloud API Gateway.",
        "Full-stack observability with OpenTelemetry auto-instrumentation, Jaeger distributed tracing, Prometheus metrics, and Loki centralized logs in Grafana."
      ],
      architectureSummary: "Microservices architecture fronted by Spring Cloud Gateway with distributed Redis caching, Kafka asynchronous pub-sub, isolated PostgreSQL databases per service, and unified telemetry collectors.",
      githubUrl: "https://github.com/Abdelrahman2411200",
      featured: true
    },
    {
      id: "ai-project-manager-agent",
      title: "AI Project Manager Agent",
      category: "AI",
      summary: "Autonomous AI agent that transforms high-level product ideas into structured roadmaps, milestones, tasks, and risk graphs.",
      description: "An intelligent autonomous project management platform that decomposes user product requirements into actionable work breakdowns, dependency graphs, and risk mitigation models with strict human-in-the-loop review.",
      techStack: ["Python", "FastAPI", "React", "TypeScript", "Vite", "PostgreSQL", "Redis", "Background Workers", "Tailwind CSS"],
      highlights: [
        "Built resilient database-backed background worker queue with worker leasing, heartbeat checks, automatic failure retries, and clean job cancellation.",
        "Implemented provider-neutral LLM adapter layer with automated schema validation, self-correcting repair loops, and token budgeting.",
        "Constructed interactive DAG dependency graphs and milestone timeline views in React with real-time approval and refinement workflows.",
        "Structured modular RESTful API architecture with comprehensive OpenAPI/Swagger documentation and automated regression tests."
      ],
      architectureSummary: "FastAPI REST API orchestrating async workers over a persistent task lease table, streaming structured plan generations to a responsive Vite/React interface.",
      githubUrl: "https://github.com/Abdelrahman2411200",
      featured: true
    },
    {
      id: "twsela-courier-platform",
      title: "TWSELA Courier & Delivery Platform",
      category: "Full-Stack",
      summary: "MENA-focused logistics & courier management system featuring Arabic-first RTL, 5 custom user roles, and COD reconciliation.",
      description: "Comprehensive multi-tenant courier and delivery operations engine tailored for MENA logistics workflows with native Arabic RTL/LTR bidirectional support, automated dispatch manifests, and Cash on Delivery (COD) audit trails.",
      techStack: ["Java 17", "Spring Boot 3.3", "Spring Security", "JWT", "Spring Data JPA", "Redis", "WebSockets", "Resilience4j", "React 18", "Tailwind CSS", "Recharts"],
      highlights: [
        "Developed fine-grained Role-Based Access Control (RBAC) supporting 5 distinct operational roles with JWT and audit logs.",
        "Designed real-time package status and courier tracking utilizing WebSockets with Redis Pub/Sub fallback.",
        "Engineered financial reconciliation modules for Cash-on-Delivery (COD), Proof-of-Delivery (POD) validation, and automated manifests generation.",
        "Applied Resilience4j circuit breakers, bulkheads, and rate limiters to protect critical booking endpoints from traffic spikes."
      ],
      architectureSummary: "Spring Boot 3.3 monolith designed with clean domain-driven module boundaries, Redis acceleration, WebSocket event gateway, and responsive React/Tailwind frontend.",
      githubUrl: "https://github.com/Abdelrahman2411200",
      featured: true
    },
    {
      id: "aircraft-management-mro-ai",
      title: "Aircraft Operation & MRO Platform (DevOps Lead)",
      category: "DevOps",
      summary: "Enterprise aviation maintenance, operations, and predictive analytics platform deployed on AWS EKS with GitOps CI/CD.",
      description: "Served as DevOps Lead for an aviation fleet management and AI-assisted Maintenance, Repair, and Overhaul (MRO) platform, architecting the cloud infrastructure and automated compliance pipelines.",
      techStack: ["Kubernetes", "AWS EKS", "Terraform", "Kustomize", "GitHub Actions", "GHCR", "Trivy", "tfsec", "Playwright", "Vitest", "Docker"],
      highlights: [
        "Architected complete Infrastructure as Code (IaC) using Terraform to provision multi-AZ AWS EKS clusters, VPCs, IAM roles, and security groups.",
        "Built zero-trust GitHub Actions CI/CD pipeline publishing signed images to GHCR with automated vulnerability scanning (Trivy) and IaC linting (tfsec).",
        "Configured environment overlay management with Kustomize for seamless Dev/Staging/Production deployments with zero downtime.",
        "Integrated automated end-to-end integration audits and frontend smoke testing with Playwright and Vitest prior to rollout."
      ],
      architectureSummary: "GitOps-driven Kubernetes architecture hosted on AWS EKS with Terraform-managed VPCs, automated security gates, and container security scanners.",
      githubUrl: "https://github.com/Abdelrahman2411200",
      featured: true
    },
    {
      id: "cn-banking-transaction-system",
      title: "CN Banking Transaction System",
      category: "Backend",
      summary: "High-throughput cloud-native banking ledger and transfer microservices with real-time fraud detection and shared Kafka contracts.",
      description: "Cloud-native banking engine handling double-entry accounting, real-time account transfers, fraud anomaly detection, and customer notifications.",
      techStack: ["TypeScript", "Node.js", "Express", "Apache Kafka", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "PostgreSQL", "Redis"],
      highlights: [
        "Engineered ACID-compliant double-entry ledger service preventing negative balances with pessimistic database row locking.",
        "Implemented shared TypeScript NPM packages for strict Kafka event schemas and type-safe inter-service communication.",
        "Built streaming fraud detection listener that inspects transfer frequency and flags velocity anomalies in sub-10ms.",
        "Automated deployment on Kubernetes with Horizontal Pod Autoscalers (HPA) and rolling zero-downtime updates."
      ],
      architectureSummary: "Decoupled TypeScript services communicating via Apache Kafka event streams with dedicated PostgreSQL stores and Kubernetes orchestration.",
      githubUrl: "https://github.com/Abdelrahman2411200",
      featured: false
    },
    {
      id: "ms-cloud-native-platform",
      title: "MS Cloud-Native E-Commerce Platform",
      category: "DevOps",
      summary: "Multi-language e-commerce microservices with Nginx API Gateway, Blue-Green deployments on EKS, and Prometheus telemetry.",
      description: "Distributed e-commerce platform blending Node.js and FastAPI microservices behind an Nginx reverse proxy gateway, hosted on Kubernetes with automated blue-green deployment pipelines.",
      techStack: ["Node.js", "Python FastAPI", "Nginx", "Kubernetes", "Terraform", "AWS EKS", "PostgreSQL", "Redis", "Prometheus", "Grafana"],
      highlights: [
        "Configured Nginx reverse proxy with SSL termination, dynamic upstream load balancing, and rate limiting.",
        "Designed Blue-Green deployment manifests on Kubernetes to guarantee seamless, zero-downtime releases.",
        "Provisioned scalable AWS EKS infrastructure with Terraform and integrated automated metrics collection with Prometheus and Grafana dashboards.",
        "Implemented distributed caching with Redis to achieve 70% latency reduction on high-traffic product catalog queries."
      ],
      architectureSummary: "Polyglot microservices deployed in segregated Kubernetes namespaces behind Nginx with AWS EKS auto-scaling and Prometheus monitoring.",
      githubUrl: "https://github.com/Abdelrahman2411200",
      featured: false
    },
    {
      id: "stockpilot",
      title: "StockPilot: Inventory & ML Forecasting",
      category: "Full-Stack",
      summary: "Modern inventory management platform pairing NestJS backend with Python ML demand forecasting and CI/CD quality gates.",
      description: "Enterprise inventory control platform that connects real-time sales telemetry with machine learning demand forecasting to prevent stockouts and optimize warehouse supply chains.",
      techStack: ["NestJS", "TypeScript", "Python ML", "PostgreSQL", "Docker Compose", "GitHub Actions", "Tailwind CSS", "React"],
      highlights: [
        "Engineered modular NestJS backend utilizing clean architecture, Dependency Injection, and strict DTO validations.",
        "Integrated Python ML forecasting microservice providing predictive demand curves and reorder threshold alerts.",
        "Authored multi-service Docker Compose development environment mimicking production networking and database seeds.",
        "Set up GitHub Actions CI/CD pipelines enforcing linting, unit test coverage gates, and automated container health checks."
      ],
      architectureSummary: "NestJS backend and Python ML forecasting engine coordinated via Docker Compose, backed by PostgreSQL and managed through CI quality gates.",
      githubUrl: "https://github.com/Abdelrahman2411200",
      featured: false
    }
  ],
  academicProjects: [
    {
      id: "insurance-system-erd",
      title: "Insurance Software System & Database (ERD)",
      category: "Databases & Architecture",
      description: "Designed a relational database schema (3NF) and management system for policy handling, claims processing, and multi-tier customer actuarial records.",
      techStack: ["SQL", "Relational Modeling", "ERD Design", "Normalization (3NF)"],
      keyTakeaway: "Mastered rigorous normalization, relational constraints, foreign keys indexing, and query optimization."
    },
    {
      id: "pcm-simulation",
      title: "Pulse Code Modulation (PCM) Simulation",
      category: "Signal Processing & Networking",
      description: "Modeled end-to-end PCM transmission pipeline simulating sampling, uniform/non-uniform quantization (A-law & μ-law), and binary encoding.",
      techStack: ["MATLAB", "Simulink", "Signal Processing"],
      keyTakeaway: "Deepened practical grasp of digital signal conversion, quantization noise (SQNR), and transmission channel limits."
    },
    {
      id: "cybersecurity-hotel-network",
      title: "Enterprise Cybersecurity Hotel Network Architecture",
      category: "Security & Networking",
      description: "Engineered secure multi-tier enterprise network topology with segmented VLANs (Guests, Staff, POS, IoT, Management), stateful firewall ACLs, and DMZ.",
      techStack: ["Cisco Packet Tracer", "VLANs", "Firewall ACLs", "Network Segmentation", "Security Policy"],
      keyTakeaway: "Applied defense-in-depth security principles, strict subnet isolation, and zero-trust perimeter controls."
    },
    {
      id: "ml-flower-classification",
      title: "Machine Learning Flower Classification System",
      category: "Artificial Intelligence",
      description: "Trained and evaluated multi-class classification models using computer vision feature extraction, hyperparameter tuning, and cross-validation.",
      techStack: ["Python", "Scikit-Learn", "NumPy", "Pandas", "Matplotlib"],
      keyTakeaway: "Strengthened core data science workflow: feature engineering, bias/variance tradeoff evaluation, and confusion matrix analysis."
    },
    {
      id: "devops-qr-scanner-pipeline",
      title: "DevOps QR Code Scanner CI/CD Pipeline",
      category: "DevOps & Automation",
      description: "Built end-to-end automated continuous integration and delivery pipeline for a micro-utility QR scanner with automated unit tests and Docker image builds.",
      techStack: ["Docker", "GitHub Actions", "CI/CD", "Automated Testing", "Shell Scripting"],
      keyTakeaway: "Gained early foundational experience in pipeline-as-code automation and reproducible container packaging."
    }
  ],
  architectureShowcase: {
    title: "Event Management Platform Architecture",
    subtitle: "Interactive Distributed Systems & Observability Breakdown",
    systemDescription: "An in-depth look into the microservices architecture, asynchronous event bus with Transactional Outbox, distributed Saga patterns, and end-to-end OpenTelemetry observability stack.",
    nodes: [
      {
        id: "gateway",
        name: "Spring Cloud API Gateway",
        layer: "Gateway",
        tech: "Spring Cloud Gateway, Redis Rate Limiting, JWT Auth",
        description: "Single entry point for all client requests. Handles SSL termination, token validation, rate-limiting, and intelligent route dispatching.",
        details: [
          "Zero-Trust JWT validation before forwarding downstream",
          "Distributed Redis token bucket algorithm for anti-abuse rate limits",
          "CORS & Security headers injection at the edge"
        ]
      },
      {
        id: "auth-service",
        name: "Auth & Identity Service",
        layer: "Core Microservices",
        tech: "Spring Boot, Spring Security, BCrypt, PostgreSQL",
        description: "Manages user registrations, role-based access control (RBAC), and issues cryptographically signed JWT tokens.",
        details: [
          "Token issuance with short TTL and refresh rotation",
          "Encrypted credential storage with BCrypt & salt hashing",
          "User audit logs for compliance"
        ]
      },
      {
        id: "event-service",
        name: "Event & Venue Service",
        layer: "Core Microservices",
        tech: "Spring Boot, JPA, PostgreSQL, Outbox Table",
        description: "Handles event listings, seat inventory, venue allocations, and publishes state changes via Transactional Outbox.",
        details: [
          "Optimistic locking on seat allocations to avoid overbooking",
          "Transactional Outbox pattern writing events to DB in same commit",
          "Redis read-through cache for fast event browsing queries"
        ]
      },
      {
        id: "payment-service",
        name: "Payment & Saga Orchestrator",
        layer: "Core Microservices",
        tech: "Spring Boot, Kafka Streams, PostgreSQL, Resilience4j",
        description: "Coordinates payment authorization, ticketing confirmations, and automated refund compensations during failure scenarios.",
        details: [
          "Distributed Saga state machine with compensation logic",
          "Idempotency key enforcement to eliminate duplicate transactions",
          "Circuit breaker & timeout guards via Resilience4j"
        ]
      },
      {
        id: "notification-service",
        name: "Notification Microservice",
        layer: "Core Microservices",
        tech: "Spring Boot, Kafka Consumer, SendGrid, WebPush",
        description: "Listens to Kafka domain events and dispatches asynchronous emails, SMS, and push tickets to attendees.",
        details: [
          "Consumer groups with manual offset commits for reliability",
          "Dead-letter topic (DLQ) for unprocessable message recovery",
          "Template rendering engine with i18n support"
        ]
      },
      {
        id: "kafka-bus",
        name: "Apache Kafka Message Broker",
        layer: "Event Bus & Storage",
        tech: "Kafka Cluster, Schema Registry, Zookeeper/KRaft",
        description: "High-throughput, persistent event streaming backbone connecting all decoupled domain services.",
        details: [
          "Strict topic partitioning based on EventID & TenantID",
          "At-least-once delivery with idempotent producer configurations",
          "Retention policies tuned for replayability and disaster recovery"
        ]
      },
      {
        id: "otel-collector",
        name: "OpenTelemetry (OTel) Collector",
        layer: "Observability",
        tech: "OpenTelemetry Agent, OTLP Receiver, Batch Processors",
        description: "Unified telemetry collector aggregating distributed traces, metrics, and logs from every container instance.",
        details: [
          "W3C Trace Context propagation across HTTP and Kafka headers",
          "Batching and filtering to minimize network overhead",
          "Standardized exporter forwarding to Jaeger, Prometheus & Loki"
        ]
      },
      {
        id: "grafana-stack",
        name: "Grafana, Prometheus & Jaeger",
        layer: "Observability",
        tech: "Grafana Dashboards, Prometheus TSDB, Jaeger Tracing, Loki Logs",
        description: "Comprehensive operational glass cockpit providing instant visibility into latency, error budgets, and service maps.",
        details: [
          "Full distributed waterfall trace inspection for every API call",
          "Real-time RED (Rate, Errors, Duration) metrics dashboards",
          "Unified log correlation linking trace IDs directly to Loki logs"
        ]
      }
    ],
    flows: [
      { from: "gateway", to: "auth-service", label: "Auth & Validation" },
      { from: "gateway", to: "event-service", label: "Event Queries & Bookings" },
      { from: "gateway", to: "payment-service", label: "Checkout & Payments" },
      { from: "event-service", to: "kafka-bus", label: "Outbox Domain Events" },
      { from: "payment-service", to: "kafka-bus", label: "Payment Saga Events" },
      { from: "kafka-bus", to: "notification-service", label: "Event Stream Consumer" },
      { from: "auth-service", to: "otel-collector", label: "OTLP Spans & Metrics" },
      { from: "event-service", to: "otel-collector", label: "OTLP Spans & Metrics" },
      { from: "payment-service", to: "otel-collector", label: "OTLP Spans & Metrics" },
      { from: "otel-collector", to: "grafana-stack", label: "Traces, Metrics, Logs" }
    ]
  }
};
