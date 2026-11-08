import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Copy, DocPage } from "../../types";
import type { DocsKind } from "./model";

interface Props {
  copy: Copy;
  docs: DocPage[];
  activeIndex: number;
  kind: DocsKind;
}

export function DocPagination({ copy, docs, activeIndex, kind }: Props) {
  const routeBase = `/docs/${kind}`;

  return (
    <div className="doc-pagination">
      {activeIndex > 0 && (
        <Link to={`${routeBase}/${docs[activeIndex - 1]!.id}`}>
          <ArrowLeft size={15} aria-hidden="true" /><span>{copy.docsShell.previous}</span>
          <strong>{docs[activeIndex - 1]!.title}</strong>
        </Link>
      )}
      {activeIndex < docs.length - 1 && (
        <Link className="next-guide" to={`${routeBase}/${docs[activeIndex + 1]!.id}`}>
          <span>{copy.docsShell.next}</span><strong>{docs[activeIndex + 1]!.title}</strong><ArrowRight size={15} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
