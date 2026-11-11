import { ArrowUp } from "lucide-react";
export function Footer() {
  return (
    <footer className="site-footer section-shell">
      <a
        className="brand-mark"
        href="#hero"
        aria-label="Abdelrahman Mohamed, home"
      >
        am<span>.</span>
      </a>
      <p>© {new Date().getFullYear()} Abdelrahman Mohamed</p>
      <span>Made with care, in Egypt.</span>
      <a className="text-link" href="#hero">
        Back to top <ArrowUp size={16} />
      </a>
    </footer>
  );
}
