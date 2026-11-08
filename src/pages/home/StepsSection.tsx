import { Activity, ArrowUpRight } from "lucide-react";
import { Text } from "@language-lit/material3-expressive";
import { BOT_INVITE_URL } from "../../constants";
import type { Copy } from "../../types";

export function StepsSection({ copy }: { copy: Copy }) {
  const c = copy.home;
  const steps = [
    [c.step1Title, c.step1Body],
    [c.step2Title, c.step2Body],
    [c.step3Title, c.step3Body],
  ];

  return (
    <section className="section steps-section">
      <div className="container">
        <div className="section-heading compact-heading" data-reveal>
          <div className="eyebrow"><Activity size={14} aria-hidden="true" />{c.stepsEyebrow}</div>
          <Text as="h2" variant="headlineLarge">{c.stepsTitle}</Text>
        </div>
        <div className="steps-grid">
          {steps.map(([title, body], index) => (
            <article className="step-card" key={title} data-reveal="item">
              <span className="step-number">0{index + 1}</span>
              <Text as="h3" variant="titleLarge">{title}</Text>
              <p>{body}</p>
              {index === 0 && (
                <a className="step-invite-link" href={BOT_INVITE_URL} target="_blank" rel="noreferrer">
                  {copy.home.step1Action}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {index < 2 && <span className="step-connector" aria-hidden="true" />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
