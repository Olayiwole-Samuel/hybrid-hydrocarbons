"use client";

import { useEffect, useRef } from "react";
import {
  Wrench,
  HardHat,
  ShoppingBag,
  Factory,
  Gauge,
  RefreshCw,
  Zap,
  Briefcase,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// ✅ CHANGED: Updated services list per MoM (9 services)
const SERVICES = [
  {
    icon: Wrench,
    title: "Oil & Gas Engineering Services",
  },
  {
    icon: HardHat,
    title: "Construction",
  },
  {
    icon: ShoppingBag,
    title: "Procurement & Equipment Supply",
  },
  {
    icon: Factory,
    title: "Hydrocarbon Facilities Maintenance",
  },
  {
    icon: Gauge,
    title: "Mechanical, Electrical & Instrumentation Services",
  },
  {
    icon: Wrench,
    title: "Pipeline & Flowline Installation",
  },
  {
    icon: RefreshCw,
    title: "Facility Upgrades & Rehabilitation",
  },
  {
    icon: Zap,
    title: "Energy & Power Solutions",
  },
  {
    icon: Briefcase,
    title: "Project Management & Technical Consultancy",
  },
];

export default function Services() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-service-card]", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={rootRef} className="relative bg-bg py-28 lg:py-36">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="red-underline red-underline--center pb-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Our Services
          </h2>
          {/* ❌ REMOVED: "Four disciplines, one integrated energy company..." text per MoM */}
        </div>

        {/* ✅ CHANGED: Updated grid to 3 columns for 9 services */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div key={service.title} data-service-card>
              <Card className="group h-full cursor-default transition-all duration-300 hover:-translate-y-2 hover:border-red/50 hover:shadow-red-lg">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red/10 text-red transition-transform duration-300 group-hover:scale-110">
                    <service.icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}