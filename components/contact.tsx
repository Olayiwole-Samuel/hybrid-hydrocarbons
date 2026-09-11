"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook, Send, CheckCircle2 } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
];

export default function Contact() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-contact-info] > *", {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
        },
      });

      gsap.from("[data-contact-field]", {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const validate = (values: FormState): FormErrors => {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Enter your name.";
    if (!values.email.trim()) {
      next.email = "Enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) next.message = "Enter a message.";
    return next;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    // Simulated submit — replace with a real API route or form handler.
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 900);
  };

  return (
    <section id="contact" ref={rootRef} className="relative bg-bg-soft py-28 lg:py-36">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="red-underline red-underline--center pb-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Contact Us
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-ink-muted">
            Considering a partnership, a consulting engagement, or an
            introduction? Reach the team directly below.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-contact-info className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red/10 text-red">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-ink">Headquarters</p>
                <p className="text-ink-muted">
                  14 Marina Crescent, Victoria Island, Lagos, Nigeria
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red/10 text-red">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-ink">Phone</p>
                {/* ⚠️ Needs finalization from management */}
                <p className="text-ink-muted">+234 1 234 5678</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red/10 text-red">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-ink">Email</p>
                {/* ✅ CHANGED: Updated email per MoM */}
                <p className="text-ink-muted">info@hybridhydrocarbonslimited.com</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink-muted transition-all duration-300 hover:-translate-y-1 hover:border-red hover:text-red hover:shadow-red"
                >
                  <social.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div data-contact-field>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink-muted">
                Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
            </div>

            <div data-contact-field>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink-muted">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div data-contact-field>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink-muted">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your project or partnership idea"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
            </div>

            <div data-contact-field>
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "submitting"}>
                {status === "success" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Sent
                  </>
                ) : status === "submitting" ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
              {status === "success" && (
                <p className="mt-3 text-sm text-red">
                  Thanks — your message has been received. We&apos;ll be in touch shortly.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}