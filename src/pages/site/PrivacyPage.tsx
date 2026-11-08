import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Text } from "@language-lit/material3-expressive";
import { Link } from "react-router-dom";
import type { Copy } from "../../types";

export function PrivacyPage({ copy }: { copy: Copy }) {
  const privacy = copy.sitePages.privacy;
  return (
    <div className="docs-page site-info-page">
      <div className="container">
        <header className="docs-intro">
          <div className="eyebrow">{privacy.eyebrow}</div>
          <Text as="h1" variant="headlineLarge">{privacy.title}</Text>
          <p>{privacy.intro}</p>
          <p className="policy-updated">{privacy.updated}</p>
        </header>
        <article className="policy-sections">
          {privacy.sections.map((section) => (
            <section className="policy-section" key={section.heading}>
              <Text as="h2" variant="headlineSmall">{section.heading}</Text>
              <p>{section.body}</p>
            </section>
          ))}
        </article>
        <div className="site-page-actions">
          <a href="https://github.com/RiffRelay/RiffRelayBot" target="_blank" rel="noreferrer">
            {privacy.projectLink}<ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <Link to="/"><ArrowLeft size={15} aria-hidden="true" />{privacy.homeLink}</Link>
        </div>
      </div>
    </div>
  );
}
