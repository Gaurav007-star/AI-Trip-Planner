import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import heroImg from "@/assets/hero2.jpg";

function Hero() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground relative overflow-hidden">
      {/*
        ── Floating icons arranged as an ellipse ──
        They trace 6 clock positions around the title/subtitle block:

              ✈️   [badge]   🌴
           🧭  Your Personal AI  📷
              ☂️  [subtitle]  🧳
      */}

      {/* 11 o'clock — Plane, top-left */}
      <div className="hidden md:block absolute top-[11%] left-[17%] w-12 h-12 md:w-16 md:h-16 text-primary opacity-70 -rotate-[30deg] animate-float-1 pointer-events-none z-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.9-.2-1.9.1-2.4.9l-.5.8 8.1 3.8-2.6 2.6-3.3-.4c-.6-.1-1.2.2-1.4.7l-.3.6 4.7 2.1 2.1 4.7.6-.3c.5-.2.8-.8.7-1.4l-.4-3.3 2.6-2.6 3.8 8.1.8-.5c.8-.5 1.1-1.5.9-2.4z"/>
        </svg>
      </div>

      {/* 1 o'clock — Palm tree, top-right */}
      <div className="hidden md:block absolute top-[9%] right-[15%] w-12 h-12 md:w-16 md:h-16 text-accent opacity-70 rotate-[15deg] animate-float-3 pointer-events-none z-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M13 8c0-2.8-2.2-5-5-5S3 5.2 3 8h10z" />
          <path d="M12 8c0 3.3-2.7 6-6 6H3c2.2 0 4-1.8 4-4h5z" />
          <path d="M21 8c0-2.8-2.2-5-5-5s-5 2.2-5 5h10z" />
          <path d="M21 8c0 3.3-2.7 6-6 6h-3c2.2 0 4-1.8 4-4h5z" />
          <path d="M12 8v13" />
          <path d="M12 13c1.5 2 2.5 4.5 2 8" />
          <path d="M12 15c-1.5 2-2.5 4.5-2 8" />
        </svg>
      </div>

      {/* 9 o'clock — Compass, left midpoint */}
      <div className="hidden md:block absolute top-[35%] left-[4%] w-11 h-11 md:w-14 md:h-14 text-secondary opacity-65 animate-float-4 pointer-events-none z-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
        </svg>
      </div>

      {/* 3 o'clock — Camera, right midpoint */}
      <div className="hidden md:block absolute top-[33%] right-[4%] w-11 h-11 md:w-14 md:h-14 text-primary opacity-65 rotate-[8deg] animate-float-6 pointer-events-none z-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-10 pb-16 flex flex-col items-center relative z-10">
        {/* Interactive Feature Badge (to lift the top area) */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-6 z-10 border border-primary/20 animate-pulse select-none">
          ✨ Next-Gen AI Travel Agent
        </div>

        {/* High-Converting Typographic Layout */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-center tracking-tight text-foreground leading-[1.05] max-w-4xl font-sans">
          Your Personal AI
          <br />
          Travel Agent for
          <br />
          Instant Dream Trips
        </h1>

        {/* High-Converting Subtitle */}
        <p className="text-center text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 mb-10 leading-relaxed font-medium">
          Skip hours of research. We craft customized travel plans, select the best hotels, and design perfect daily itineraries tailored to your budget and vibe — instantly.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button asChild className="h-12 px-8 rounded-full text-base shadow-md hover:shadow-lg">
            <Link to="/create-trip">
              Get Started — It's Free
            </Link>
          </Button>
        </div>

        {/* Premium Graphic Preview Card matching the image layout */}
        <img
          src={heroImg}
          alt="AI Travel Planner Dashboard"
          className="w-full max-w-full h-auto mt-20 rounded-2xl z-10 transition-transform duration-500 select-none "
        />
      </div>
    </div>
  );
}

export default Hero;

