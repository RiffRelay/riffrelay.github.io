import { ArrowRight, ChevronDown } from "lucide-react";
import { Text } from "@language-lit/material3-expressive";
import { useId, useState } from "react";
import { Link } from "react-router-dom";
import type { Copy } from "../../types";

export function FaqPage({ copy }: { copy: Copy }) {
  const faq = copy.sitePages.faq;
  const idPrefix = useId();
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(() => new Set());

  return (
    <div className="docs-page site-info-page">
      <div className="container">
        <header className="docs-intro">
          <div className="eyebrow">{faq.eyebrow}</div>
          <Text as="h1" variant="headlineLarge">{faq.title}</Text>
          <p>{faq.intro}</p>
        </header>
        <section className="faq-list" aria-label={faq.title}>
          {faq.questions.map((item, index) => {
            const isOpen = openQuestions.has(index);
            const questionId = `${idPrefix}-question-${index}`;
            const answerId = `${idPrefix}-answer-${index}`;
            return (
              <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.question}>
                <button
                  aria-controls={answerId}
                  aria-expanded={isOpen}
                  className="faq-question"
                  id={questionId}
                  onClick={() => setOpenQuestions((current) => {
                    const next = new Set(current);
                    if (isOpen) next.delete(index);
                    else next.add(index);
                    return next;
                  })}
                  type="button"
                >
                  {item.question}<ChevronDown size={18} aria-hidden="true" />
                </button>
                <div aria-hidden={!isOpen} className="faq-answer" id={answerId} aria-labelledby={questionId}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </section>
        <div className="site-page-actions">
          <Link to="/docs/bot/command-catalog">{faq.commandsLink}<ArrowRight size={16} aria-hidden="true" /></Link>
          <Link to="/docs/api/overview">{faq.apiLink}<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </div>
  );
}
