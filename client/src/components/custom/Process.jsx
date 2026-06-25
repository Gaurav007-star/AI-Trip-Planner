import { Search, SlidersHorizontal, Sparkles, Heart } from "lucide-react";
import { Button } from "../ui/button";

const STEPS = [
  {
    num: "01",
    icon: Search,
    title: "Choose Your Destination",
    description:
      "Search any city, country, or hidden gem. Our AI knows millions of places worldwide.",
  },
  {
    num: "02",
    icon: SlidersHorizontal,
    title: "Set Your Preferences",
    description:
      "Pick your budget, duration, and travel style — from backpacking to luxury getaways.",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "AI Generates Your Plan",
    description:
      "Our engine crafts a complete itinerary with hotels, activities, and day-by-day schedules.",
  },
  {
    num: "04",
    icon: Heart,
    title: "Enjoy Your Trip",
    description:
      "Save, share, or tweak your plan. Your perfect adventure is just a click away.",
  },
];

function Process() {
  return (
    <section id="how-it-works" className="w-full sm:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header ── */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-primary bg-primary/8 border border-primary/20 px-3.5 py-1 rounded-full mb-5 select-none">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.1] mt-2">
            From idea to itinerary
            <br />
            <span className="text-primary">in minutes</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Four simple steps to your next adventure — no research, no stress,
            just pure travel magic.
          </p>
        </div>

        {/* ── Steps grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-[2.15rem] left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px"
            style={{
              background:
                "repeating-linear-gradient(to right, var(--border) 0px, var(--border) 6px, transparent 6px, transparent 14px)",
            }}
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="relative flex flex-col items-center text-center group"
              >
                {/* icon circle */}
                <div className="relative z-10 w-[4.5rem] h-[4.5rem] rounded-2xl bg-card border border-border flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300 mb-5">
                  <Icon size={24} strokeWidth={1.5} className="text-primary" />
                  {/* step number badge */}
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-[15px] font-semibold text-foreground leading-snug mb-2">
                  {step.title}
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[220px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-border bg-card px-8 py-6">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Ready to plan your next trip?
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Join thousands of travelers using Truveler every day.
            </p>
          </div>
          <Button varient="primary" asChild>
            <a href="/create-trip">Start Planning Free →</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Process;
