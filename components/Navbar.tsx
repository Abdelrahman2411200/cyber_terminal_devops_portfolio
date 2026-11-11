"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { portfolioContent } from "@/data/content";
import { CommandPalette } from "./CommandPalette";

const links = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Toolkit", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
      if (event.key === "Escape") setMenuOpen(false);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    [...links, { href: "#hero" }].forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });
    document.addEventListener("keydown", onKey);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return (
    <>
      <header className="site-header">
        <div className="nav-inner section-shell">
          <a
            href="#hero"
            className="brand"
            id="nav-brand-link"
            aria-label="Abdelrahman Mohamed, home"
          >
            <span className="brand-mark">
              am<span>.</span>
            </span>
            <span className="brand-name">
              Abdelrahman
              <br />
              Mohamed
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "location" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              type="button"
              className="icon-button search-trigger"
              aria-label="Search portfolio (Ctrl+K)"
              onClick={() => setPaletteOpen(true)}
            >
              <Search size={17} />
            </button>
            <a href="#contact" className="nav-contact">
              Let’s talk <ArrowUpRight size={16} />
            </a>
            <button
              type="button"
              id="mobile-menu-toggle"
              className="icon-button mobile-toggle"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
                <ArrowUpRight size={17} />
              </a>
            ))}
            <a href={portfolioContent.personal.cvPath} download>
              Download Resume
              <ArrowUpRight size={17} />
            </a>
          </nav>
        )}
      </header>
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </>
  );
}
