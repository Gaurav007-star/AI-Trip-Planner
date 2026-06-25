import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sparkles, Wallet, Target, Pencil, Globe, UserPlus } from "lucide-react";

const FAQS = [
  {
    icon: Sparkles,
    q: "How does the AI trip planner work?",
    a: "Tell us your destination, budget, duration, and group size. Our AI instantly generates a complete itinerary — hotels, daily activities, and more — tailored exactly to your preferences.",
  },
  {
    icon: Wallet,
    q: "Is it really free to use?",
    a: "Yes! Planning trips is completely free. You can generate unlimited itineraries, save your favorites, and share them with friends without paying a cent.",
  },
  {
    icon: Target,
    q: "How accurate are the recommendations?",
    a: "Our AI pulls from vast travel databases and user trends to suggest popular, well-rated hotels and activities. We recommend verifying hours and pricing before you go, as things can change.",
  },
  {
    icon: Pencil,
    q: "Can I customize the generated itinerary?",
    a: "Absolutely. You can tweak any part of your plan — swap hotels, change activities, or adjust the schedule. Your trip, your way.",
  },
  {
    icon: Globe,
    q: "What destinations are supported?",
    a: "Anywhere in the world. Whether it's a weekend in Tokyo, a safari in Kenya, or a road trip through Tuscany — our AI has you covered.",
  },
  {
    icon: UserPlus,
    q: "Do I need to create an account?",
    a: "You need a free Google account to save and access your trips. Generating a plan doesn't require login — just sign in when you're ready to save.",
  },
];

function Faq() {
  return (
    <section id="faq" className="w-full py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header — same style as Process section ── */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-primary bg-primary/8 border border-primary/20 px-3.5 py-1 rounded-full mb-5 select-none">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.1] mt-2">
            Got questions?
          </h2>
          <p className="mt-5 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Everything you need to know about Truveler. Can&apos;t find your answer?{" "}
            <a href="mailto:hello@truveler.com" className="text-primary hover:underline font-medium">
              Email us
            </a>
            .
          </p>
        </div>

        {/* ── Borderless accordion — just dividing lines ── */}
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto divide-y divide-border border-t border-b border-border"
        >
          {FAQS.map((faq, i) => {
            const Icon = faq.icon;
            return (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-none"
            >
              <AccordionTrigger className="py-5 text-[15px] font-medium text-foreground hover:no-underline hover:text-primary transition-colors [&>svg]:text-muted-foreground gap-3">
                <span className="flex items-center gap-3">
                  <Icon size={18} strokeWidth={1.5} className="text-primary shrink-0" />
                  {faq.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-[14px] text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          );
          })}
        </Accordion>

      </div>
    </section>
  );
}

export default Faq;
