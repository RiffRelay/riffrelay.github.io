import { Activity, ArrowRight } from "lucide-react";
import { Text } from "@language-lit/material3-expressive";
import { Link } from "react-router-dom";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import { useScrollParallax } from "../../hooks/useScrollParallax";
import type { Copy } from "../../types";

hljs.registerLanguage("typescript", typescript);

export function ApiSection({ copy }: { copy: Copy }) {
  const c = copy.home;
  const codeRef = useScrollParallax<HTMLDivElement>(14, 3.5);
  const highlightedCode = hljs.highlight(c.apiCode, { language: "typescript" }).value;

  return (
    <section className="api-section">
      <div className="container api-panel">
        <div className="api-copy" data-reveal>
          <div className="eyebrow"><Activity size={14} aria-hidden="true" />{c.apiEyebrow}</div>
          <Text as="h2" variant="headlineLarge">{c.apiTitle}</Text>
          <p>{c.apiBody}</p>
          <Link to="/docs/api/quickstart" className="api-link">{c.apiAction}<ArrowRight size={16} aria-hidden="true" /></Link>
          <small>{c.apiNote}</small>
        </div>
        <div className="api-code-card" ref={codeRef} data-reveal>
          <div className="code-header" aria-hidden="true"><span className="code-language">TS</span><span>{c.apiCodeFile}</span></div>
          <pre><code className="hljs language-typescript" dangerouslySetInnerHTML={{ __html: highlightedCode }} /></pre>
        </div>
      </div>
    </section>
  );
}
