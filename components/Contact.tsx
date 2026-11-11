"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin } from "lucide-react";
import { portfolioContent } from "@/data/content";
import { SectionBackground } from "./SectionBackground";

export function Contact() {
  const { personal } = portfolioContent;
  const [copyStatus, setCopyStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copyEmail = async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(personal.email);
      copied = true;
    } catch {
      // Embedded previews can deny Clipboard API access even on localhost.
      const previousFocus = document.activeElement as HTMLElement | null;
      const field = document.createElement("textarea");
      field.value = personal.email;
      field.readOnly = true;
      field.tabIndex = -1;
      field.style.cssText = "position:fixed;opacity:0;pointer-events:none";
      document.body.appendChild(field);
      field.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      } finally {
        field.remove();
        previousFocus?.focus({ preventScroll: true });
      }
    }
    setCopyStatus(
      copied
        ? "Email copied"
        : "Please select and copy the email address above.",
    );
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyStatus(""), 3500);
  };
  return (
    <section id="contact" className="contact-section">
      <SectionBackground effect="aurora" />
      <div className="section-shell">
        <div className="contact-top">
          <span className="availability">
            <span className="status-dot" /> Open to opportunities
          </span>
          <span>Have something in mind?</span>
        </div>
        <div className="contact-main">
          <div>
            <h2>
              Let’s make
              <br />
              good things work.
            </h2>
            <p>
              I’m looking for my next chapter in software or DevOps engineering.
              If you think we’d work well together, I’d love to hear from you.
            </p>
          </div>
          <a
            href={`mailto:${personal.email}`}
            className="contact-arrow"
            aria-label="Send Abdelrahman an email"
            id="contact-email-btn"
          >
            <ArrowUpRight strokeWidth={1.2} />
          </a>
        </div>
        <div className="contact-bottom">
          <div className="email-row">
            <a className="contact-email" href={`mailto:${personal.email}`}>
              {personal.email}
            </a>
            <button
              id="copy-email-btn"
              className="icon-button"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copyStatus === "Email copied" ? (
                <Check size={17} />
              ) : (
                <Copy size={17} />
              )}
            </button>
            <span role="status" className="copy-status">
              {copyStatus}
            </span>
          </div>
          <div className="contact-socials">
            <a href={personal.github} target="_blank" rel="noopener noreferrer">
              <Github size={17} />
              GitHub <ArrowUpRight size={14} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={17} />
              LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
