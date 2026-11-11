"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { portfolioContent } from "@/data/content";

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    setQuery("");
    const element = dialog.current;
    element?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [isOpen]);
  const items = [
    { label: "Selected work", href: "#projects" },
    { label: "About me", href: "#about" },
    { label: "My toolkit", href: "#skills" },
    { label: "Architecture explorer", href: "#architecture" },
    { label: "Academic projects", href: "#academic" },
    { label: "Contact", href: "#contact" },
    {
      label: "Download Resume",
      href: portfolioContent.personal.cvPath,
      download: true,
    },
    { label: "GitHub", href: portfolioContent.personal.github },
    { label: "LinkedIn", href: portfolioContent.personal.linkedin },
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  if (!isOpen) return null;
  return (
    <dialog
      className="search-dialog"
      ref={dialog}
      aria-label="Search portfolio"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="search-box">
        <Search size={20} />
        <input
          autoFocus
          aria-label="Find a page or link"
          placeholder="Where would you like to go?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              dialog.current
                ?.querySelector<HTMLAnchorElement>(".search-results a")
                ?.focus();
            }
            if (event.key === "Enter" && items[0]) {
              dialog.current
                ?.querySelector<HTMLAnchorElement>(".search-results a")
                ?.click();
            }
          }}
        />
        <button
          className="icon-button"
          aria-label="Close search"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      <div
        className="search-results"
        onKeyDown={(event) => {
          const anchors = Array.from(
            dialog.current?.querySelectorAll<HTMLAnchorElement>(
              ".search-results a",
            ) || [],
          );
          const index = anchors.indexOf(
            document.activeElement as HTMLAnchorElement,
          );
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            anchors[
              (index + (event.key === "ArrowDown" ? 1 : -1) + anchors.length) %
                anchors.length
            ]?.focus();
          }
        }}
      >
        {items.map((item) => (
          <a
            href={item.href}
            key={item.label}
            onClick={onClose}
            download={item.download || undefined}
            target={item.href.startsWith("https") ? "_blank" : undefined}
            rel={
              item.href.startsWith("https") ? "noopener noreferrer" : undefined
            }
          >
            {item.label}
            <ArrowUpRight size={16} />
          </a>
        ))}
        {items.length === 0 && (
          <p>No matches. Try “work”, “resume”, or “contact”.</p>
        )}
      </div>
      <div className="search-footer">
        Use ↑ ↓ to browse, Enter to open, Esc to close.
      </div>
    </dialog>
  );
}
