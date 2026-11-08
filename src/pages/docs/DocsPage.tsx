import { useMemo } from "react";
import { useParams } from "react-router-dom";
import type { Copy } from "../../types";
import { NotFoundPage } from "../site/NotFoundPage";
import { DocsContent } from "./DocsContent";
import { DocsIntro } from "./DocsIntro";
import { DocsSidebar } from "./DocsSidebar";
import { filterDocs, getDocs, groupDocs, type DocsKind } from "./model";
import { useDocsPageState } from "./useDocsPageState";

export function DocsPage({ copy, kind }: { copy: Copy; kind: DocsKind }) {
  const { slug } = useParams();
  const docs = useMemo(() => getDocs(copy, kind), [copy, kind]);
  const matchingDoc = docs.find((doc) => doc.id === slug);
  const current = matchingDoc ?? docs[0]!;
  const activeIndex = docs.findIndex((doc) => doc.id === current.id);
  const state = useDocsPageState({ kind, docs, current, slug });
  const filtered = useMemo(() => filterDocs(copy, docs, state.query), [copy, docs, state.query]);
  const groups = useMemo(() => groupDocs(filtered), [filtered]);

  if (slug && !matchingDoc) return <NotFoundPage copy={copy} />;

  return (
    <div className="docs-page">
      <div className="container">
        <DocsIntro copy={copy} kind={kind} />
        <div className="docs-layout">
          <DocsSidebar
            copy={copy} kind={kind} current={current} filtered={filtered} groups={groups}
            routeBase={state.routeBase} query={state.query} inputRef={state.inputRef}
            activeSection={state.activeSection} onQueryChange={state.setQuery} onOpenSection={state.openSection}
          />
          <DocsContent
            copy={copy} kind={kind} current={current} docs={docs} query={state.query}
            activeIndex={activeIndex} activeSection={state.activeSection} copied={state.copied}
            onOpenSection={state.openSection} onCopyCode={state.copyCode}
          />
        </div>
      </div>
    </div>
  );
}
