export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-bg py-8">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-red-gradient" />
      <div className="container flex flex-col items-center justify-between gap-4 text-sm text-ink-muted sm:flex-row">
        <p>
          © {year} Hybrid Hydrocarbons Limited. All rights reserved.
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-ink-muted/70">
          Powering Tomorrow with Hybrid Innovation
        </p>
      </div>
    </footer>
  );
}