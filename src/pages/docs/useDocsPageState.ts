import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DocPage } from "../../types";
import type { DocsKind } from "./model";

interface Args {
  kind: DocsKind;
  docs: DocPage[];
  current: DocPage;
  slug?: string;
}

export function useDocsPageState({ kind, docs, current, slug }: Args) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState("");
  const [activeSection, setActiveSection] = useState(0);
  const routeBase = `/docs/${kind}`;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "/" || ["INPUT", "TEXTAREA"].includes((event.target as HTMLElement)?.tagName)) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!slug) navigate(`${routeBase}/${docs[0]!.id}`, { replace: true });
  }, [docs, navigate, routeBase, slug]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      const index = Number(visible.target.id.replace("section-", ""));
      if (Number.isInteger(index)) setActiveSection(index);
    }, { rootMargin: "-15% 0px -70% 0px" });
    current.sections.forEach((_, index) => {
      const section = document.getElementById(`section-${index}`);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [current.id, current.sections.length]);

  const openSection = (index: number) => {
    navigate(`${routeBase}/${current.id}#section-${index}`);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(`section-${index}`)?.scrollIntoView({ behavior, block: "start" });
      });
    });
  };
  const copyCode = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  };

  return { inputRef, query, setQuery, copied, activeSection, routeBase, openSection, copyCode };
}
