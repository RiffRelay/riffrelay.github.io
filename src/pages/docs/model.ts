import catalog from "../../generated/command-catalog.json";
import type { Copy, DocPage } from "../../types";

export type DocsKind = "api" | "bot";

export function getDocs(copy: Copy, kind: DocsKind): DocPage[] {
  if (kind === "api") return copy.docs.filter((doc) => doc.id !== "bot-commands");
  const botGuide = copy.docs.find((doc) => doc.id === "bot-commands");
  return [
    {
      id: "command-catalog",
      title: copy.docsShell.commandCatalogTitle,
      summary: copy.docsShell.commandCatalogSummary,
      category: copy.docsShell.botCategory,
      sections: [],
    },
    ...[botGuide].filter((doc): doc is DocPage => Boolean(doc)),
  ];
}

export function filterDocs(copy: Copy, docs: DocPage[], query: string): DocPage[] {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return docs;
  return docs.filter((doc) => {
    if (doc.id === "command-catalog") {
      return catalog.commands.some((command) => [
        command.name, command.description, command.category, copy.catalogCategories[command.category] ?? "",
        ...command.aliases, command.usage ?? "", ...command.examples,
        ...command.options.flatMap((option) => [option.name, option.description]),
      ].join(" ").toLocaleLowerCase().includes(needle));
    }
    return [
      doc.title, doc.summary, doc.category,
      ...doc.sections.flatMap((section) => [section.heading, section.body, section.code ?? ""]),
    ].join(" ").toLocaleLowerCase().includes(needle);
  });
}

export function groupDocs(docs: DocPage[]) {
  return [...docs.reduce<Map<string, DocPage[]>>((groups, doc) => {
    const group = groups.get(doc.category) ?? [];
    group.push(doc);
    groups.set(doc.category, group);
    return groups;
  }, new Map())];
}

export function isShellSnippet(code: string | undefined) {
  return Boolean(code && /^(bun|npm|pnpm|yarn)\s/.test(code.trimStart()));
}
