import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { portfolioContent } from '@/data/content';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F5EE' },
    { media: '(prefers-color-scheme: dark)', color: '#202C39' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const deployedUrl = 'https://abdelrahman2411200.github.io/cyber_terminal_devops_portfolio/';

export const metadata: Metadata = {
  metadataBase: new URL(deployedUrl),
  title: `${portfolioContent.personal.name} | Software & DevOps Engineer`,
  description: portfolioContent.personal.subheadline,
  alternates: {
    canonical: deployedUrl,
  },
  keywords: [
    'Abdelrahman Mohamed',
    'Abdelrahman Mohamed Ahmed',
    'Software Engineer',
    'DevOps Engineer',
    'Spring Boot',
    'FastAPI',
    'Kubernetes',
    'Terraform',
    'Docker',
    'Kafka',
    'Microservices',
    'Distributed Systems',
    'Observability',
    'Prometheus',
    'Grafana',
    'React',
    'TypeScript',
    'Egypt',
  ],
  authors: [{ name: portfolioContent.personal.name, url: portfolioContent.personal.github }],
  creator: portfolioContent.personal.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: deployedUrl,
    title: `${portfolioContent.personal.name} | Software & DevOps Engineer`,
    description: portfolioContent.personal.subheadline,
    siteName: `${portfolioContent.personal.name} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${portfolioContent.personal.name} | Software & DevOps Engineer`,
    description: portfolioContent.personal.subheadline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolioContent.personal.name,
    jobTitle: portfolioContent.personal.title,
    url: deployedUrl,
    sameAs: [
      portfolioContent.personal.github,
      portfolioContent.personal.linkedin,
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: portfolioContent.personal.education.institution,
    },
    knowsAbout: [
      'Distributed Systems',
      'Microservices',
      'DevOps',
      'Kubernetes',
      'Terraform',
      'Java Spring Boot',
      'Python FastAPI',
      'Apache Kafka',
      'Cloud Architecture',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground transition-colors duration-300 min-h-screen selection:bg-[#F29559] selection:text-[#202C39]">
        {/* Skip to Main Content Link for WCAG Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#F29559] text-[#202C39] font-mono text-xs font-bold rounded-lg shadow-lg ring-2 ring-[#F2D492]"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
