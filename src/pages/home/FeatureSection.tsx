import { BarChart3, Disc3, Radio, UsersRound } from "lucide-react";
import { Text } from "@language-lit/material3-expressive";
import type { Copy } from "../../types";

const icons = [Radio, BarChart3, UsersRound];

export function FeatureSection({ copy }: { copy: Copy }) {
  const c = copy.home;
  const items = [
    [c.featureListeningTitle, c.featureListeningBody],
    [c.featureStatsTitle, c.featureStatsBody],
    [c.featureExploreTitle, c.featureExploreBody],
  ];

  return (
    <section className="section feature-section" id="features">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div className="eyebrow"><Disc3 size={14} aria-hidden="true" />{c.featuresEyebrow}</div>
          <Text as="h2" variant="headlineLarge">{c.featuresTitle}</Text>
          <p>{c.featuresBody}</p>
        </div>
        <div className="feature-grid">
          {items.map(([title, body], index) => {
            const Icon = icons[index];
            return (
              <article key={title} className="feature-card" data-reveal="item">
                <div className="feature-title">
                  <Icon size={17} aria-hidden="true" />
                  <Text as="h3" variant="titleLarge">{title}</Text>
                </div>
                <p>{body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
