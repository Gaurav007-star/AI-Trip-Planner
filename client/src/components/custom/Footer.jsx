import { Link } from "react-router-dom";
import { Mail, ArrowUpRight } from "lucide-react";

const NAV = {
  Product: [
    { label: "Create Trip", href: "/create-trip" },
    { label: "My Trips", href: "/user" },
  ],
  Support: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "mailto:hello@truveler.com", external: true },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-foreground text-background">

      {/* ── Top content ── */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">

          {/* Brand column — no socials */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 w-fit">
              <img
                src="/logo.png"
                alt="Truveler"
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-[13px] leading-relaxed text-background/55 max-w-[220px]">
              Your personal AI travel agent. Skip the research — go straight to
              your dream trip.
            </p>
            <a
              href="mailto:hello@truveler.com"
              className="inline-flex items-center gap-1.5 text-[12px] text-background/50 hover:text-background transition-colors duration-150 w-fit"
            >
              <Mail size={13} strokeWidth={1.8} />
              hello@truveler.com
            </a>
          </div>

          {/* Nav columns */}
          {Object.entries(NAV).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold tracking-[0.12em] uppercase text-background/35 select-none">
                {section}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-[13px] text-background/60 hover:text-background transition-colors duration-150 flex items-center gap-1 group w-fit"
                    >
                      {label}
                      {external && (
                        <ArrowUpRight
                          size={11}
                          className="opacity-0 group-hover:opacity-60 transition-opacity"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Giant centred wordmark ── */}
      <div className="w-full flex items-center justify-center py-4 select-none">
        <span
          className="font-bold text-[clamp(64px,15vw,260px)] text-center block w-full bg-gradient-to-b from-background/[0.15] via-background/[0.06] to-background/[0.01] bg-clip-text text-transparent leading-none tracking-tighter"
          aria-hidden="true"
        >
          TRUVELER
        </span>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-background/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[12px] text-background/35">
            © {year} Truveler. All rights reserved.
          </p>
          <p className="text-[12px] text-background/35">
            Made with ✈️ &amp; AI
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
