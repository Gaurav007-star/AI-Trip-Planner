import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChevronUp } from "lucide-react";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;

    if (hash) {
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) lenis.scrollTo(el, { offset: 0 });
      }, 100);
      return () => clearTimeout(timer);
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash]);

  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;

    const onScroll = () => setVisible(lenis.scroll > 400);
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 hover:opacity-90 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ChevronUp size={18} strokeWidth={2.5} />
    </button>
  );
}

export default ScrollToTop;
