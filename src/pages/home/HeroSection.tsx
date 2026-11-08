import { Activity, ArrowRight } from "lucide-react";
import { Button } from "@language-lit/material3-expressive";
import { Link } from "react-router-dom";
import type { Copy } from "../../types";
import { DiscordPreview } from "../../components/DiscordPreview";

export function HeroSection({ copy }: { copy: Copy }) {
  const scrollToCommands = () => document.getElementById("commands")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
  });

  return (
    <section className="hero-section">
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="hero-copy-content">
            <div className="eyebrow hero-eyebrow"><Activity size={14} aria-hidden="true" />{copy.hero.eyebrow}</div>
            <h1>{copy.hero.headline}</h1>
            <p className="hero-lede">{copy.hero.body}</p>
          </div>
          <div className="hero-actions">
            <Button className="hero-primary" variant="filled" size="small" trailingIcon={<ArrowRight size={16} />} onClick={scrollToCommands}>
              {copy.hero.primary}
            </Button>
            <Link className="secondary-link" to="/docs/api/overview">
              {copy.hero.secondary}<ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="hero-preview-stage">
          <DiscordPreview copy={copy} />
        </div>
      </div>
      <div className="hero-bottom container">
        <span className="scroll-cue">{copy.home.scrollLabel}</span>
        <p>{copy.home.trustBody}</p>
      </div>
    </section>
  );
}
