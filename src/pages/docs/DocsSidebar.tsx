import { ChevronRight, Search } from "lucide-react";
import type { RefObject } from "react";
import { Link } from "react-router-dom";
import type { Copy, DocPage } from "../../types";
import type { DocsKind } from "./model";

interface Props {
  copy: Copy;
  kind: DocsKind;
  current: DocPage;
  filtered: DocPage[];
  groups: [string, DocPage[]][];
  routeBase: string;
  query: string;
  inputRef: RefObject<HTMLInputElement | null>;
  activeSection: number;
  onQueryChange: (value: string) => void;
  onOpenSection: (index: number) => void;
}

export function DocsSidebar({ copy, kind, current, filtered, groups, routeBase, query, inputRef, activeSection, onQueryChange, onOpenSection }: Props) {
  const label = kind === "api" ? copy.docsShell.apiGuides : copy.docsShell.botGuides;

  return (
    <aside className="docs-sidebar">
      <label className="search-field">
        <Search size={16} aria-hidden="true" />
        <input ref={inputRef} value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={copy.docsShell.searchPlaceholder} aria-label={copy.docsShell.searchLabel} />
        <kbd>/</kbd>
      </label>
      <span className="sidebar-caption">{label}</span>
      {query && <p className="search-count">{filtered.length} {copy.docsShell.results}</p>}
      <nav className="docs-nav" aria-label={label}>
        {filtered.length ? groups.map(([category, categoryDocs]) => (
          <details className="docs-nav-group" key={category} open={categoryDocs.some((doc) => doc.id === current.id)}>
            <summary>{category}<ChevronRight size={14} aria-hidden="true" /></summary>
            <div className="docs-nav-pages">
              {categoryDocs.map((doc) => (
                <div className="docs-nav-page" key={doc.id}>
                  <Link className={doc.id === current.id ? "is-current" : ""} to={`${routeBase}/${doc.id}`}>
                    <span>{doc.title}</span><ChevronRight size={14} aria-hidden="true" />
                  </Link>
                  {doc.id === current.id && doc.sections.length > 0 && (
                    <div className="docs-nav-sections">
                      {doc.sections.map((section, index) => (
                        <Link
                          key={section.heading}
                          className={index === activeSection ? "is-current" : ""}
                          aria-current={index === activeSection ? "location" : undefined}
                          to={`${routeBase}/${doc.id}#section-${index}`}
                          onClick={(event) => {
                            event.preventDefault();
                            onOpenSection(index);
                          }}
                        >
                          {section.heading}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </details>
        )) : <p className="empty-search">{copy.docsShell.noResults}</p>}
      </nav>
    </aside>
  );
}
