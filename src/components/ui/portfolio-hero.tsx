import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { StackSpread } from "./stack-spread";
import { ArrowFillButton } from "./arrow-fill-button";
import { TestimonialsSection } from "./testimonials-3";
import { ResumeSections } from "./resume-sections";

const menuItems = ["HOME", "ABOUT", "PROJECTS", "EXPERIENCE", "CONTACT"];

function BlurText({ text, delay = 70, className = "" }: { text: string; delay?: number; className?: string }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <p ref={ref} className={className} aria-label={text}>
    {text.split("").map((character, index) => <span key={`${character}-${index}`} style={{ transitionDelay: `${index * delay}ms`, opacity: inView ? 1 : 0, filter: inView ? "blur(0)" : "blur(14px)", transform: inView ? "translateY(0)" : "translateY(-22px)" }}>{character === " " ? "\u00a0" : character}</span>)}
  </p>;
}

export function PortfolioHero() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => { document.documentElement.dataset.theme = isDark ? "dark" : "light"; }, [isDark]);

  return <div className="site-shell">
    <header className="site-header">
      <div className="nav-wrap">
        <div className="menu-area">
          <button className="icon-button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}>{isMenuOpen ? <X /> : <Menu />}</button>
          <div className={`menu-panel ${isMenuOpen ? "menu-panel--open" : ""}`}>
            {menuItems.map((item, index) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className={index === 0 ? "active" : ""}>{item}</a>)}
          </div>
        </div>
        <a className="signature" href="#home" aria-label="Mukul Rai home">MR</a>
        <button className="theme-toggle" onClick={() => setIsDark(!isDark)} aria-label="Toggle theme"><span>{isDark ? <Moon /> : <Sun />}</span></button>
      </div>
    </header>

    <main id="home" className="hero">
      <ArrowFillButton />
      <div className="hero-copy">
        <BlurText text="MUKUL" className="hero-name" />
        <BlurText text="RAI" delay={90} className="hero-name" />
        <div className="portrait-wrap"><div className="portrait-glow" /><img src="/photo.jpg" alt="Mukul Rai" className="portrait" /></div>
      </div>
      <div className="hero-footer"><BlurText text="Designing human experiences in code." delay={45} className="tagline" /><span className="availability"><i /> Available for select projects</span></div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to about"><ChevronDown /></a>
    </main>
    <section id="about" className="sr-only"><h2>About Mukul Rai</h2><p>Mukul Rai is a UI/UX Designer creating thoughtful digital experiences.</p></section>
    <StackSpread />
    <TestimonialsSection />
    <ResumeSections />
  </div>;
}
