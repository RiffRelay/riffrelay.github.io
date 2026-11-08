import { useEffect, useRef } from "react";
import type { Copy } from "../../types";
import { ApiSection } from "./ApiSection";
import { CommandSection } from "./CommandSection";
import { FeatureSection } from "./FeatureSection";
import { HeroSection } from "./HeroSection";
import { StepsSection } from "./StepsSection";

export function HomePage({ copy }: { copy: Copy }) {
  const homeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const home = homeRef.current;
    if (!home || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const items = [...home.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (!items.length) return;

    home.classList.add("reveal-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      home.classList.remove("reveal-ready");
      items.forEach((item) => item.classList.remove("is-revealed"));
    };
  }, []);

  return (
    <div className="home-page" ref={homeRef}>
      <HeroSection copy={copy} />
      <FeatureSection copy={copy} />
      <CommandSection copy={copy} />
      <StepsSection copy={copy} />
      <ApiSection copy={copy} />
    </div>
  );
}
