"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import aboutImage from "@/assets/about.jpeg";

// ✅ CHANGED: Updated stats per MoM (10+ Years, 20+ Global Partners, removed Lower Emissions)
const STATS = [
  { value: 10, suffix: "+", label: "Years of Excellence" },
  { value: 20, suffix: "+", label: "Global Partners" },
  // ❌ REMOVED: Lower Emissions metric
];

export default function About() {
  const rootRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-about-text]", {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
        },
      });

      gsap.from("[data-about-visual]", {
        opacity: 0,
        x: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
        },
      });

      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = STATS[i].value;
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.floor(counter.value).toString();
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="relative bg-bg-soft py-28 lg:py-36">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="red-underline red-underline--center pb-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            About Us
          </h2>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div data-about-text>
            {/* ✅ CHANGED: Updated About Us text per MoM */}
            <p className="mt-6 leading-relaxed text-ink-muted">
              Hybrid Hydrocarbons Limited is an energy and hydrocarbon solutions company
              committed to delivering reliable, innovative, and value-driven solutions to
              clients across the industry.
            </p>
            <p className="mt-4 leading-relaxed text-ink-muted">
              We combine technical expertise, industry knowledge, strategic partnerships,
              and a strong commitment to excellence to provide practical and efficient
              solutions that meet our clients&apos; unique needs.
            </p>
            <p className="mt-4 leading-relaxed text-ink-muted">
              Driven by integrity, professionalism, safety, and customer satisfaction, we
              are focused on building lasting partnerships and creating sustainable value
              for our clients and stakeholders.
            </p>

            {/* ✅ CHANGED: Updated stats grid (2 items instead of 3) */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8">
              {STATS.map((stat, i) => (
                <div key={stat.label}>
                  <div className="flex items-baseline text-3xl font-extrabold text-red sm:text-4xl">
                    <span
                      ref={(el) => {
                        statRefs.current[i] = el;
                      }}
                    >
                      0
                    </span>
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-wide text-ink-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div data-about-visual className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-red/[0.06] blur-3xl" />
            <img
              src={aboutImage.src}
              alt="About Us"
              className="relative h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}