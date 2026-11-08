export type Language = "en" | "ko" | "de" | "pl" | "es";

export interface DocSection {
  heading: string;
  body: string;
  code?: string;
  language?: string;
}

export interface DocPage {
  id: string;
  title: string;
  summary: string;
  category: string;
  sections: DocSection[];
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface SiteContentSection {
  heading: string;
  body: string;
}

export interface SitePagesCopy {
  faqLink: string;
  privacyLink: string;
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    questions: FaqEntry[];
    commandsLink: string;
    apiLink: string;
  };
  privacy: {
    eyebrow: string;
    title: string;
    updated: string;
    intro: string;
    sections: SiteContentSection[];
    projectLink: string;
    homeLink: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    body: string;
    homeLink: string;
    faqLink: string;
    apiLink: string;
  };
}

export interface Copy {
  localeName: string;
  header: Record<string, string>;
  hero: Record<string, string>;
  home: Record<string, string>;
  docsShell: Record<string, string>;
  catalogCategories: Record<string, string>;
  sourcePaths: Record<string, string>;
  docs: DocPage[];
  sitePages: SitePagesCopy;
}
