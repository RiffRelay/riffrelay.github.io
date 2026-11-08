import { ArrowLeft, ArrowRight } from "lucide-react";
import { Text } from "@language-lit/material3-expressive";
import { Link } from "react-router-dom";
import type { Copy } from "../../types";

export function NotFoundPage({ copy }: { copy: Copy }) {
  const page = copy.sitePages.notFound;
  return (
    <section className="not-found-page">
      <div className="container not-found-content">
        <div className="eyebrow">{page.eyebrow}</div>
        <Text as="h1" variant="displaySmall">{page.title}</Text>
        <p>{page.body}</p>
        <nav className="not-found-actions" aria-label={page.title}>
          <Link className="not-found-home" to="/"><ArrowLeft size={16} aria-hidden="true" />{page.homeLink}</Link>
          <Link to="/faq">{page.faqLink}</Link>
          <Link to="/docs/api/overview">{page.apiLink}<ArrowRight size={16} aria-hidden="true" /></Link>
        </nav>
      </div>
    </section>
  );
}
