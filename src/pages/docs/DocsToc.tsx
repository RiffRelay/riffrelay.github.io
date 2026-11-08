import { Link } from "react-router-dom";
import type { Copy, DocPage } from "../../types";
import type { DocsKind } from "./model";

interface Props {
  copy: Copy;
  current: DocPage;
  kind: DocsKind;
  activeSection: number;
  onOpenSection: (index: number) => void;
}

export function DocsToc({ copy, current, kind, activeSection, onOpenSection }: Props) {
  return (
    <div className="doc-toc">
      <h3>{copy.docsShell.contents}</h3>
      <div>
        {current.sections.map((section, index) => (
          <Link
            key={section.heading}
            className={index === activeSection ? "is-current" : ""}
            aria-current={index === activeSection ? "location" : undefined}
            to={`/docs/${kind}/${current.id}#section-${index}`}
            onClick={(event) => {
              event.preventDefault();
              onOpenSection(index);
            }}
          >
            {section.heading}
          </Link>
        ))}
      </div>
    </div>
  );
}
