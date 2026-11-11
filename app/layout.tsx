import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AmbientBackground } from "@/components/AmbientBackground";
import { portfolioContent } from "@/data/content";

const inter = Manrope({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#151927",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const deployedUrl =
  "https://abdelrahman2411200.github.io/cyber_terminal_devops_portfolio/";

export const metadata: Metadata = {
  metadataBase: new URL(deployedUrl),
  title: `${portfolioContent.personal.name} | Software & DevOps Engineer`,
  description: portfolioContent.personal.subheadline,
  alternates: {
    canonical: deployedUrl,
  },
  keywords: [
    "Abdelrahman Mohamed",
    "Abdelrahman Mohamed Ahmed",
    "Software Engineer",
    "DevOps Engineer",
    "Spring Boot",
    "FastAPI",
    "Kubernetes",
    "Terraform",
    "Docker",
    "Kafka",
    "Microservices",
    "Distributed Systems",
    "Observability",
    "Prometheus",
    "Grafana",
    "React",
    "TypeScript",
    "Egypt",
  ],
  authors: [
    {
      name: portfolioContent.personal.name,
      url: portfolioContent.personal.github,
    },
  ],
  creator: portfolioContent.personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: deployedUrl,
    title: `${portfolioContent.personal.name} | Software & DevOps Engineer`,
    description: portfolioContent.personal.subheadline,
    siteName: `${portfolioContent.personal.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
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
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioContent.personal.name,
    jobTitle: portfolioContent.personal.title,
    url: deployedUrl,
    sameAs: [
      portfolioContent.personal.github,
      portfolioContent.personal.linkedin,
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: portfolioContent.personal.education.institution,
    },
    knowsAbout: [
      "Distributed Systems",
      "Microservices",
      "DevOps",
      "Kubernetes",
      "Terraform",
      "Java Spring Boot",
      "Python FastAPI",
      "Apache Kafka",
      "Cloud Architecture",
    ],
  };

  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <AmbientBackground />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
