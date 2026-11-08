import { ArrowRight, Check, Languages } from "lucide-react";
import { Button, Menu as MaterialMenu } from "@language-lit/material3-expressive";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Copy, Language } from "../../types";

const languageNames: Record<Language, string> = {
  en: "English",
  ko: "한국어",
  de: "Deutsch",
  pl: "Polski",
  es: "Español",
};

interface Props {
  copy: Copy;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onMenuClose: () => void;
}

export function HeaderActions({ copy, language, onLanguageChange, onMenuClose }: Props) {
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const languageItems = (Object.entries(languageNames) as [Language, string][]).map(([value, label]) => ({
    value,
    label,
    leadingIcon: language === value ? <Check size={16} aria-hidden="true" /> : undefined,
    onSelect: () => {
      onLanguageChange(value);
      onMenuClose();
    },
  }));

  return (
    <div className="header-nav-actions">
      <Button
        ref={languageButtonRef}
        className="language-menu-trigger"
        variant="outlined"
        size="small"
        leadingIcon={<Languages size={16} aria-hidden="true" />}
        aria-label={`${copy.header.language}: ${languageNames[language]}`}
        aria-haspopup="menu"
        aria-expanded={languageMenuOpen}
        onClick={() => setLanguageMenuOpen((open) => !open)}
      >
        {languageNames[language]}
      </Button>
      <MaterialMenu anchorRef={languageButtonRef} open={languageMenuOpen} onOpenChange={setLanguageMenuOpen} items={languageItems} />
      <Button
        variant="filled"
        size="small"
        trailingIcon={<ArrowRight size={14} aria-hidden="true" />}
        className="header-cta"
        onClick={() => {
          onMenuClose();
          navigate("/docs/bot/command-catalog");
        }}
      >
        {copy.hero.primary}
      </Button>
    </div>
  );
}
