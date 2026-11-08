import { Material3Provider } from "@language-lit/material3-expressive";
import { HashRouter, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import en from "./i18n/en.json";
import ko from "./i18n/ko.json";
import de from "./i18n/de.json";
import pl from "./i18n/pl.json";
import es from "./i18n/es.json";
import docExamples from "./i18n/doc-examples.json";
import { SiteRoutes } from "./SiteRoutes";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { riffTheme } from "./theme";
import type { Copy, DocSection, Language } from "./types";

type SharedExamples = Record<string, Record<string, Pick<DocSection, "code" | "language">>>;
const sharedExamples: SharedExamples = docExamples;

function addSharedExamples(copy: Copy): Copy {
  return {
    ...copy,
    docs: copy.docs.map((page) => ({
      ...page,
      sections: page.sections.map((section, index) => {
        if (section.code) return section;
        const example = sharedExamples[page.id]?.[String(index)];
        return example ? { ...section, ...example } : section;
      }),
    })),
  };
}

const dictionaries: Record<Language, Copy> = {
  en: addSharedExamples(en),
  ko: addSharedExamples(ko),
  de: addSharedExamples(de),
  pl: addSharedExamples(pl),
  es: addSharedExamples(es),
};

function Site() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("riffrelay-language");
    if (saved && saved in dictionaries) return saved as Language;
    const locale = navigator.language.toLowerCase().split("-")[0];
    return locale && locale in dictionaries ? locale as Language : "en";
  });
  const copy = dictionaries[language];
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("riffrelay-language", language);
    document.documentElement.lang = language;
    const pageTitle = location.pathname === "/faq" ? copy.sitePages.faq.title
      : location.pathname === "/privacy" ? copy.sitePages.privacy.title : copy.hero.headline;
    const description = location.pathname === "/faq" ? copy.sitePages.faq.intro
      : location.pathname === "/privacy" ? copy.sitePages.privacy.intro : copy.hero.body;
    document.title = `${copy.home.footerBrand} — ${pageTitle}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [copy, language, location.pathname]);

  useEffect(() => {
    const sectionId = location.hash.slice(1);
    if (sectionId) {
      requestAnimationFrame(() => document.getElementById(sectionId)?.scrollIntoView());
      return;
    }
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    window.scrollTo({ top: 0, behavior });
  }, [location.hash, location.pathname]);

  return (
    <div className="site-root">
      <a className="skip-link" href="#main-content">{copy.header.skip}</a>
      <SiteHeader copy={copy} language={language} onLanguageChange={setLanguage} />
      <main id="main-content" tabIndex={-1}>
        <SiteRoutes copy={copy} />
      </main>
      <SiteFooter copy={copy} />
    </div>
  );
}

export default function App() {
  return (
    <Material3Provider className="m3-scope" colorMode="dark" theme={riffTheme}>
      <HashRouter>
        <Site />
      </HashRouter>
    </Material3Provider>
  );
}
