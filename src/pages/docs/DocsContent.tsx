import { ArrowLeft, ChevronRight } from "lucide-react";
import { Text } from "@language-lit/material3-expressive";
import { Link } from "react-router-dom";
import type { Copy, DocPage } from "../../types";
import type { DocsKind } from "./model";
import { CommandCatalog } from "./CommandCatalog";
import { DocPagination } from "./DocPagination";
import { DocSections } from "./DocSections";
import { DocsToc } from "./DocsToc";

interface Props {
  copy: Copy;
  kind: DocsKind;
  current: DocPage;
  docs: DocPage[];
  query: string;
  activeIndex: number;
  activeSection: number;
  copied: string;
  onOpenSection: (index: number) => void;
  onCopyCode: (id: string, value: string) => void;
}

export function DocsContent({ copy, kind, current, docs, query, activeIndex, activeSection, copied, onOpenSection, onCopyCode }: Props) {
  const isCatalog = current.id === "command-catalog";
  const sourcePath = copy.sourcePaths[current.id] ?? "src/commands/index.ts";
  const repository = kind === "bot" ? "RiffRelayBot" : "listenbrainz-api";
  const sourceUrl = `https://github.com/RiffRelay/${repository}/blob/main/${sourcePath}`;

  return (
    <article className="docs-content">
      <div className="doc-meta"><span>{current.category}</span><span>{copy.docsShell.updated}</span></div>
      <Text as="h2" variant="headlineLarge">{current.title}</Text>
      <p className="doc-summary">{current.summary}</p>
      {!isCatalog && <DocsToc copy={copy} current={current} kind={kind} activeSection={activeSection} onOpenSection={onOpenSection} />}
      {isCatalog
        ? <CommandCatalog copy={copy} query={query} />
        : <DocSections copy={copy} current={current} copied={copied} onCopyCode={onCopyCode} />}
      <a className="source-reference" href={sourceUrl} target="_blank" rel="noreferrer">
        {copy.docsShell.source}<code>{sourcePath}</code><ChevronRight size={14} aria-hidden="true" />
      </a>
      <DocPagination copy={copy} docs={docs} activeIndex={activeIndex} kind={kind} />
      <Link to="/" className="back-home"><ArrowLeft size={14} aria-hidden="true" />{copy.docsShell.backHome}</Link>
    </article>
  );
}
