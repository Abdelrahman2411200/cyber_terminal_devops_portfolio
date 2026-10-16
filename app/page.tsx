import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { ArchitectureShowcase } from '@/components/ArchitectureShowcase';
import { AcademicProjects } from '@/components/AcademicProjects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main id="main-content" className="relative flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <ArchitectureShowcase />
      <AcademicProjects />
      <Contact />
      <Footer />
    </main>
  );
}
