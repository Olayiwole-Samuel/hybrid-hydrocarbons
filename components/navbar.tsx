"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png"; // ✅ FIXED: Correct import syntax
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-line py-3" : "bg-transparent py-5"
      )}
    >
      <nav className="container flex items-center justify-between">
        {/* ✅ CHANGED: Updated logo with correct brand colors per MoM */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink"
        >
          <img 
            src={logo.src} 
            alt="Hybrid Hydrocarbons Logo" 
            className="h-10 w-auto object-contain" 
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={cn(
                  "relative text-sm font-medium tracking-wide text-ink-muted transition-colors hover:text-ink group py-1",
                  active === link.href && "text-ink"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-[#E3262A] transition-transform duration-300 group-hover:scale-x-100",
                    active === link.href && "scale-x-100"
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          {/* ✅ CHANGED: Button color to match brand */}
          <Button
            size="sm"
            onClick={() => handleNavClick("#contact")}
            className="bg-[#E3262A] hover:bg-[#B81F23] text-white"
          >
            Partner With Us
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-ink p-2 -mr-2"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile slide-in menu */}
      <div
        ref={menuRef}
        className={cn(
          "md:hidden fixed inset-0 top-0 z-40 bg-bg/98 glass transition-transform duration-500 ease-out",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: menuOpen ? `${i * 60 + 100}ms` : "0ms" }}
              className={cn(
                "transition-all duration-500",
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={cn(
                  "text-2xl font-semibold tracking-wide text-ink-muted hover:text-[#E3262A] transition-colors",
                  active === link.href && "text-[#E3262A]"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <Button 
              onClick={() => handleNavClick("#contact")}
              className="bg-[#E3262A] hover:bg-[#B81F23] text-white"
            >
              Partner With Us
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}