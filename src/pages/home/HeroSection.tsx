import { Activity, ArrowRight } from "lucide-react";
import { Button } from "@language-lit/material3-expressive";
import { Link } from "react-router-dom";
import { siDiscord } from "simple-icons";
import type { Copy } from "../../types";
import { DiscordPreview } from "../../components/DiscordPreview";
import { BOT_INVITE_URL } from "../../constants";

export function HeroSection({ copy }: { copy: Copy }) {
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
            <Button
              className="hero-primary"
              variant="filled"
              size="small"
              leadingIcon={
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
                  <path d={siDiscord.path} fill="currentColor" />
                </svg>
              }
              onClick={() => window.open(BOT_INVITE_URL, "_blank", "noopener,noreferrer")}
            >
              {copy.header.invite}
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
