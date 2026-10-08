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
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://abdelrahman-mohamed.dev'),
  title: `${portfolioContent.personal.name} | Software Engineer & DevOps Engineer`,
  description: portfolioContent.personal.subheadline,
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
  authors: [{ name: portfolioContent.personal.name }],
  creator: portfolioContent.personal.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abdelrahman-mohamed.dev',
    title: `${portfolioContent.personal.name} | Software Engineer & DevOps Engineer`,
    description: portfolioContent.personal.subheadline,
    siteName: `${portfolioContent.personal.name} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${portfolioContent.personal.name} | Software Engineer & DevOps Engineer`,
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
    url: 'https://abdelrahman-mohamed.dev',
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
      <body className="font-sans antialiased bg-background text-foreground transition-colors duration-300 min-h-screen">
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
