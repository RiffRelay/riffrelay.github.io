import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { DocPage } from "../../types";

interface Props {
  title: string;
  routeBase: string;
  pages: DocPage[];
  sectionsLabel: string;
  onNavigate: () => void;
}

export function DocDropdown({ title, routeBase, pages, sectionsLabel, onNavigate }: Props) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const groups = pages.reduce<Map<string, DocPage[]>>((result, page) => {
    const group = result.get(page.category) ?? [];
    group.push(page);
    result.set(page.category, group);
    return result;
  }, new Map());

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const dismissOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) close();
    };
    const dismissOnPageScroll = (event: Event) => {
      const target = event.target;
      const headerNav = menuRef.current?.closest(".header-nav");
      if (target instanceof Node && (menuRef.current?.contains(target) || headerNav?.contains(target))) return;
      close();
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      menuRef.current?.querySelector("summary")?.focus();
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissOnEscape);
    window.addEventListener("scroll", dismissOnPageScroll, true);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissOnEscape);
      window.removeEventListener("scroll", dismissOnPageScroll, true);
    };
  }, [open]);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  return (
    <details ref={menuRef} className="header-doc-menu" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary aria-expanded={open}>{title}<ArrowDown size={13} aria-hidden="true" /></summary>
      <div className="header-doc-menu-list">
        {[...groups].map(([category, groupPages]) => (
          <div className="header-doc-menu-group" key={category}>
            <span>{category}</span>
            {groupPages.map((page) => (
              <div className="header-doc-menu-page" key={page.id}>
                <NavLink to={`${routeBase}/${page.id}`} onClick={() => { close(); onNavigate(); }}>{page.title}</NavLink>
                {page.sections.length > 0 && <DocSectionsMenu page={page} routeBase={routeBase} sectionsLabel={sectionsLabel} onSelect={() => { close(); onNavigate(); }} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </details>
  );
}

function DocSectionsMenu({ page, routeBase, sectionsLabel, onSelect }: {
  page: DocPage;
  routeBase: string;
  sectionsLabel: string;
  onSelect: () => void;
}) {
  return (
    <details className="header-doc-submenu">
      <summary>{sectionsLabel}<ArrowDown size={11} aria-hidden="true" /></summary>
      <div>
        {page.sections.map((section, index) => (
          <NavLink key={section.heading} to={`${routeBase}/${page.id}#section-${index}`} onClick={onSelect}>
            {section.heading}
          </NavLink>
        ))}
      </div>
    </details>
  );
}
