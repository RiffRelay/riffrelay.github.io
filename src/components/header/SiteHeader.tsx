import { ArrowUpRight } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import type { Copy, DocPage, Language } from "../../types";
import { DocDropdown } from "./DocDropdown";
import { HeaderActions } from "./HeaderActions";
import { MobileMenuToggle } from "./MobileMenuToggle";

interface Props {
  copy: Copy;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function SiteHeader({ copy, language, onLanguageChange }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const apiPages = copy.docs.filter((doc) => !["bot-commands", "routes"].includes(doc.id));
  const botPages: DocPage[] = [
    {
      id: "command-catalog",
      title: copy.docsShell.commandCatalogTitle,
      summary: copy.docsShell.commandCatalogSummary,
      category: copy.docsShell.botCategory,
      sections: [],
    },
    ...copy.docs.filter((doc) => doc.id === "bot-commands"),
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand-lockup" to="/" aria-label={copy.home.footerBrand}>
          <img src={`${import.meta.env.BASE_URL}branding/riffrelay-icon.svg`} alt="" />
          <span>RiffRelay</span>
        </Link>
        <MobileMenuToggle copy={copy} open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
        <nav id="primary-navigation" className={`header-nav ${menuOpen ? "is-open" : ""}`} aria-label={copy.header.navigation}>
          <NavLink to="/" end onClick={closeMenu}>{copy.header.home}</NavLink>
          <DocDropdown title={copy.header.apiDocs} routeBase="/docs/api" pages={apiPages} sectionsLabel={copy.docsShell.contents} onNavigate={closeMenu} />
          <DocDropdown title={copy.header.botDocs} routeBase="/docs/bot" pages={botPages} sectionsLabel={copy.docsShell.contents} onNavigate={closeMenu} />
          <a href="https://github.com/RiffRelay/RiffRelayBot" target="_blank" rel="noreferrer" onClick={closeMenu}>
            {copy.header.repo}<ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <HeaderActions copy={copy} language={language} onLanguageChange={onLanguageChange} onMenuClose={closeMenu} />
        </nav>
      </div>
    </header>
  );
}
