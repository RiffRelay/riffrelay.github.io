import { Check, Copy as CopyIcon } from "lucide-react";
import { Text } from "@language-lit/material3-expressive";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import plaintext from "highlight.js/lib/languages/plaintext";
import type { Copy, DocPage } from "../../types";
import { isShellSnippet } from "./model";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("plaintext", plaintext);

interface Props {
  copy: Copy;
  current: DocPage;
  copied: string;
  onCopyCode: (id: string, value: string) => void;
}

export function DocSections({ copy, current, copied, onCopyCode }: Props) {
  return current.sections.map((section, index) => {
    const copyId = `${current.id}-${index}`;
    const language = section.language ?? (isShellSnippet(section.code) ? "bash" : "typescript");
    const highlighted = section.code
      ? hljs.highlight(section.code, { language: hljs.getLanguage(language) ? language : "typescript" }).value
      : "";

    return (
      <section className="doc-section" id={`section-${index}`} key={section.heading}>
        <Text as="h3" variant="titleLarge">{section.heading}</Text>
        <p>{section.body}</p>
        {section.code && (
          <div className="doc-code">
            <div className="doc-code-bar">
              <span>{language}</span>
              <button className="copy-button" type="button"
                aria-label={copied === copyId ? copy.docsShell.copied : copy.docsShell.copyCode}
                onClick={() => void onCopyCode(copyId, section.code!)}>
                {copied === copyId ? <Check size={16} aria-hidden="true" /> : <CopyIcon size={16} aria-hidden="true" />}
                <span>{copied === copyId ? copy.docsShell.copied : copy.docsShell.copy}</span>
              </button>
            </div>
            <pre><code className={`hljs language-${language}`} dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>
          </div>
        )}
      </section>
    );
  });
}
