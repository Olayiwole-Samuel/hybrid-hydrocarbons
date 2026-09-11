"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Globe2,
  Leaf,
  Activity,
  Zap,
  Cpu,
  Gauge,
  Flame,
  Droplets,
  Layers,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Fixed particles with custom coordinates & movement vectors
const PARTICLES = [
  { size: 4, top: "15%", left: "8%", duration: 7, delay: 0 },
  { size: 6, top: "25%", left: "42%", duration: 9, delay: 1 },
  { size: 3, top: "65%", left: "18%", duration: 8, delay: 2 },
  { size: 5, top: "78%", left: "38%", duration: 11, delay: 0.5 },
  { size: 4, top: "12%", left: "82%", duration: 6, delay: 1.5 },
  { size: 7, top: "45%", left: "92%", duration: 10, delay: 0.2 },
  { size: 3, top: "85%", left: "78%", duration: 7.5, delay: 2.2 },
  { size: 5, top: "32%", left: "62%", duration: 8.5, delay: 1.2 },
];

// ✅ CHANGED: Updated stats per MoM (10+ Years, 20+ Global Partners, removed Lower Emissions)
const STATS_DATA = [
  { numericValue: 10, suffix: "+", label: "Years of Excellence" },
  { numericValue: 20, suffix: "+", label: "Global Partners" },
  // ❌ REMOVED: Lower Carbon Intensity metric
];

// ✅ CHANGED: Updated trust badges to reflect new messaging
const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Quality Assured" },
  { icon: Globe2, label: "Global Operations" },
  { icon: Leaf, label: "Sustainable Innovation" },
  { icon: Cpu, label: "Technical Precision" },
];

export default function EnterpriseHeroRedesign() {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  // Floating Cards Refs
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  // Counter State
  const [stats, setStats] = useState([0, 0]);

  // Handle Mouse Parallax Movement
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!rootRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalized values (-1 to 1)
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;

    gsap.to(illustrationRef.current, {
      x: x * 20,
      y: y * 20,
      rotationY: x * 8,
      rotationX: -y * 8,
      duration: 1.2,
      ease: "power2.out",
    });

    gsap.to(parallaxBgRef.current, {
      x: x * -30,
      y: y * -30,
      duration: 1.5,
      ease: "power2.out",
    });

    // Parallax floating cards in opposing directions
    gsap.to(card1Ref.current, { x: x * -15, y: y * -15, duration: 1 });
    gsap.to(card2Ref.current, { x: x * 25, y: y * 20, duration: 1.1 });
    gsap.to(card3Ref.current, { x: x * -20, y: y * 18, duration: 0.9 });
    gsap.to(card4Ref.current, { x: x * 18, y: y * -22, duration: 1.3 });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Cinematic Sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-eyebrow]", { opacity: 0, y: 20, duration: 0.7 })
        .from(
          "[data-hero-headline-word]",
          {
            opacity: 0,
            y: 40,
            rotationX: -20,
            stagger: 0.05,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .from(
          "[data-hero-sub]",
          { opacity: 0, y: 24, duration: 0.7 },
          "-=0.5"
        )
        .from(
          "[data-hero-cta]",
          { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 },
          "-=0.4"
        )
        .from(
          "[data-hero-trust]",
          { opacity: 0, y: 15, stagger: 0.08, duration: 0.5 },
          "-=0.3"
        )
        .from(
          "[data-hero-stats]",
          { opacity: 0, y: 20, duration: 0.6 },
          "-=0.3"
        )
        .from(
          illustrationRef.current,
          { opacity: 0, scale: 0.85, duration: 1.2, ease: "power3.out" },
          "-=1.2"
        )
        .from(
          "[data-hero-floating-card]",
          { opacity: 0, y: 30, scale: 0.9, stagger: 0.12, duration: 0.8 },
          "-=0.8"
        );

      // 2. Statistics Counter Animation
      const dummyObj = { val0: 0, val1: 0 };
      gsap.to(dummyObj, {
        val0: STATS_DATA[0].numericValue,
        val1: STATS_DATA[1].numericValue,
        duration: 2.5,
        ease: "power2.out",
        delay: 0.5,
        onUpdate: () => {
          setStats([
            dummyObj.val0,
            dummyObj.val1,
          ]);
        },
      });

      // 3. Continuous Orbiting & Pulse Loops
      gsap.to("[data-orbit-ring-1]", {
        rotation: 360,
        duration: 35,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      gsap.to("[data-orbit-ring-2]", {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      gsap.to("[data-orbit-ring-3]", {
        rotation: 360,
        duration: 45,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // Floating Cards Soft Bobbing
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];
      cards.forEach((card, idx) => {
        if (!card) return;
        gsap.to(card, {
          y: idx % 2 === 0 ? "-=12" : "+=12",
          duration: 3 + idx * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.easeInOut",
        });
      });

      // 4. Scroll Parallax Animations
      if (rootRef.current) {
        gsap.to(rightColRef.current, {
          y: 80,
          opacity: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(leftColRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafafa] pt-24 pb-16 lg:pt-32 lg:pb-24 select-none"
      style={{ perspective: "1200px" }}
    >
      {/* ------------------------------------------------------------- */}
      {/* LAYERED BACKGROUNDS & AMBIENT LIGHTING                        */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={parallaxBgRef}
        className="pointer-events-none absolute inset-0 transition-transform will-change-transform"
      >
        {/* Soft Radial Ambient Glow */}
        <div
          className="absolute -top-[20%] left-1/2 h-[800px] w-[1000px] -translate-x-1/2 rounded-full opacity-60 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(200,16,46,0.15) 0%, rgba(255,77,94,0.05) 50%, transparent 80%)",
          }}
        />

        {/* Dynamic Architectural Grid & Vector Texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #111827 1px, transparent 1px),
              linear-gradient(to bottom, #111827 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient Blurred Accent Lights */}
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-[#c8102e]/10 blur-[120px]" />
        <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-[#ff4d5e]/10 blur-[130px]" />

        {/* Floating Particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-tr from-[#c8102e] to-[#ff4d5e] opacity-40 blur-[0.5px]"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: p.top,
              left: p.left,
              animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTAINER LAYOUT                                         */}
      {/* ------------------------------------------------------------- */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">

          {/* ========================================================= */}
          {/* LEFT COLUMN: HERO CONTENT & COPYWRITING                   */}
          {/* ========================================================= */}
          <div ref={leftColRef} className="lg:col-span-6 flex flex-col justify-center">

            {/* Corporate Badge */}
            <div data-hero-eyebrow className="mb-6 inline-flex items-center self-start">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#c8102e]/20 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#c8102e] shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff4d5e] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c8102e]" />
                </span>
                Energy & Hydrocarbon Solutions
              </span>
            </div>

            {/* Premium Multi-line Headline */}
            <h1 className="text-balance text-4xl font-black leading-[1.08] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
              <span className="block overflow-hidden py-0.5">
                {["Architecting", "the", "Next"].map((word, i) => (
                  <span
                    key={i}
                    data-hero-headline-word
                    className="inline-block mr-2.5"
                  >
                    {word}
                  </span>
                ))}
              </span>
              <span className="block overflow-hidden py-0.5">
                <span
                  data-hero-headline-word
                  className="inline-block bg-gradient-to-r from-[#c8102e] via-[#e02444] to-[#ff4d5e] bg-clip-text text-transparent mr-2.5"
                >
                  Generation
                </span>
                <span data-hero-headline-word className="inline-block">
                  of Energy.
                </span>
              </span>
            </h1>

            {/* ✅ CHANGED: Updated supporting paragraph per MoM */}

            {/* ✅ CHANGED: Added new paragraph from MoM */}
            <p
              data-hero-sub
              className="mt-4 max-w-xl text-base leading-relaxed text-[#5b6472] font-normal"
            >
              At Hybrid Hydrocarbons Limited, we provide solutions and power progress
              across the energy and hydrocarbon value chain.
            </p>

            {/* ✅ CHANGED: Added third paragraph from MoM */}
            <p
              data-hero-sub
              className="mt-4 max-w-xl text-base leading-relaxed text-[#5b6472] font-normal"
            >
              From reliable oil & gas services to technical solutions, procurement, and
              project support, we are committed to delivering value, strengthening
              operations, and enabling sustainable growth across the industries we serve.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div data-hero-cta>
                <a
                  href="#services"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#c8102e] to-[#ff4d5e] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#c8102e]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#c8102e]/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              <div data-hero-cta>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2.5 rounded-xl border border-[#111827]/15 bg-white/60 px-7 py-4 text-sm font-semibold text-[#111827] shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#c8102e]/40 hover:bg-white hover:shadow-md hover:text-[#c8102e]"
                >
                  <Sparkles className="h-4 w-4 text-[#c8102e]" />
                  <span>Contact Us</span>
                </a>
              </div>
            </div>

            {/* ✅ CHANGED: Updated trust badges with new text per MoM */}
            <div className="mt-10 border-t border-[#111827]/10 pt-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {TRUST_BADGES.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={idx}
                      data-hero-trust
                      className="flex items-center gap-2 text-xs font-semibold text-[#5b6472]"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#c8102e]/10 text-[#c8102e]">
                        <IconComponent className="h-3.5 w-3.5" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ✅ CHANGED: Updated stats counters (2 items instead of 4) */}
            <div
              data-hero-stats
              className="mt-8 grid grid-cols-2 gap-6 rounded-2xl border border-[#111827]/10 bg-white/40 p-6 shadow-sm backdrop-blur-md sm:grid-cols-2"
            >
              {STATS_DATA.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <div className="text-2xl font-black text-[#111827] sm:text-3xl tracking-tight">
                    {stats[i]?.toFixed(0) || 0}
                    <span className="text-[#c8102e]">{stat.suffix}</span>
                  </div>
                  <span className="mt-1 text-xs font-medium text-[#5b6472] leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: MASSIVE ENTERPRISE VISUALIZATION            */}
          {/* ========================================================= */}
          <div
            ref={rightColRef}
            className="lg:col-span-6 relative flex items-center justify-center min-h-[520px] lg:min-h-[620px]"
          >
            {/* Visual Wrapper for 3D Tilt Parallax */}
            <div
              ref={illustrationRef}
              className="relative w-full max-w-[560px] aspect-square flex items-center justify-center transform-style-3d will-change-transform"
            >
              {/* Back Glow Effect */}
              <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-[#c8102e]/20 via-[#ff4d5e]/15 to-transparent blur-3xl" />

              {/* --------------------------------------------------- */}
              {/* SVG HYBRID ENERGY STRUCTURE & ORBITAL RINGS        */}
              {/* --------------------------------------------------- */}
              <svg
                viewBox="0 0 600 600"
                className="absolute inset-0 h-full w-full drop-shadow-2xl"
                fill="none"
              >
                <defs>
                  {/* Primary Linear Gradients */}
                  <linearGradient id="primaryRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c8102e" />
                    <stop offset="100%" stopColor="#ff4d5e" />
                  </linearGradient>

                  <linearGradient id="darkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#111827" />
                    <stop offset="100%" stopColor="#2c374e" />
                  </linearGradient>

                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ff4d5e" />
                  </linearGradient>

                  {/* Radial Pulse Gradient */}
                  <radialGradient id="corePulse" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ff4d5e" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#c8102e" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#111827" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Outer Track Line */}
                <circle
                  cx="300"
                  cy="300"
                  r="270"
                  stroke="#111827"
                  strokeOpacity="0.08"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />

                {/* Orbit Ring 1: Technological Grid Outer Ring */}
                <g data-orbit-ring-1>
                  <circle
                    cx="300"
                    cy="300"
                    r="240"
                    stroke="url(#primaryRedGrad)"
                    strokeWidth="2"
                    strokeOpacity="0.4"
                    strokeDasharray="120 40 20 40"
                  />
                  <circle cx="540" cy="300" r="6" fill="#c8102e" />
                  <circle cx="60" cy="300" r="4" fill="#ff4d5e" />
                </g>

                {/* Orbit Ring 2: Segmented Energy Ring */}
                <g data-orbit-ring-2>
                  <circle
                    cx="300"
                    cy="300"
                    r="190"
                    stroke="url(#darkGrad)"
                    strokeWidth="3"
                    strokeOpacity="0.3"
                    strokeDasharray="30 15 90 15"
                  />
                  <circle cx="300" cy="110" r="5" fill="#111827" />
                  <circle cx="300" cy="490" r="5" fill="#c8102e" />
                </g>

                {/* Orbit Ring 3: Inner Hydrogen & Clean Energy Arc */}
                <g data-orbit-ring-3>
                  <circle
                    cx="300"
                    cy="300"
                    r="140"
                    stroke="url(#primaryRedGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="180 260"
                  />
                  <circle cx="300" cy="160" r="7" fill="#ff4d5e" />
                </g>

                {/* Geometric Central Core & Nodes */}
                <circle cx="300" cy="300" r="110" fill="url(#corePulse)" />
                <circle
                  cx="300"
                  cy="300"
                  r="85"
                  fill="#ffffff"
                  stroke="url(#primaryRedGrad)"
                  strokeWidth="3"
                  className="shadow-xl"
                />

                {/* Connecting Vector Lines */}
                <line x1="300" y1="60" x2="300" y2="540" stroke="#111827" strokeOpacity="0.06" strokeWidth="1" />
                <line x1="60" y1="300" x2="540" y2="300" stroke="#111827" strokeOpacity="0.06" strokeWidth="1" />
                <line x1="130" y1="130" x2="470" y2="470" stroke="#111827" strokeOpacity="0.06" strokeWidth="1" />
                <line x1="130" y1="470" x2="470" y2="130" stroke="#111827" strokeOpacity="0.06" strokeWidth="1" />
              </svg>

              {/* Core Icon Emblems */}
              <div className="absolute flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl border border-[#c8102e]/20">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#c8102e] to-[#ff4d5e] text-white shadow-md">
                  <Flame className="h-8 w-8 animate-pulse" />
                </div>
              </div>

              {/* --------------------------------------------------- */}
              {/* ✅ CHANGED: Updated floating cards with new text per MoM */}
              {/* "Technical Precision, Swift Response, Quality Assured, Zero Casualties" */}
              {/* --------------------------------------------------- */}

              {/* Floating Card 1: Technical Precision */}
              <div
                ref={card1Ref}
                data-hero-floating-card
                className="absolute -top-4 left-2 sm:left-6 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-3.5 shadow-xl backdrop-blur-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c8102e]/10 text-[#c8102e]">
                  <Gauge className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111827]">Technical</div>
                  <div className="text-[11px] font-semibold text-[#5b6472]">Precision</div>
                </div>
              </div>

              {/* Floating Card 2: Swift Response */}
              <div
                ref={card2Ref}
                data-hero-floating-card
                className="absolute top-1/4 -right-4 sm:-right-8 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-3.5 shadow-xl backdrop-blur-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111827]">Swift</div>
                  <div className="text-[11px] font-semibold text-[#5b6472]">Response</div>
                </div>
              </div>

              {/* Floating Card 3: Quality Assured */}
              <div
                ref={card3Ref}
                data-hero-floating-card
                className="absolute -bottom-6 left-8 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-3.5 shadow-xl backdrop-blur-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111827]">Quality</div>
                  <div className="text-[11px] font-semibold text-[#5b6472]">Assured</div>
                </div>
              </div>

              {/* Floating Card 4: Zero Casualties */}
              <div
                ref={card4Ref}
                data-hero-floating-card
                className="absolute bottom-1/4 -right-6 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-3.5 shadow-xl backdrop-blur-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827]/10 text-[#111827]">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111827]">Zero</div>
                  <div className="text-[11px] font-semibold text-[#5b6472]">Casualties</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Global CSS for particle keyframes */}
      <style jsx global>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            transform: translateY(-25px) rotate(180deg);
          }
        }
      `}</style>
    </section>
  );
}