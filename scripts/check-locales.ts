const en = await Bun.file(new URL("../src/i18n/en.json", import.meta.url)).json();
const examples = await Bun.file(new URL("../src/i18n/doc-examples.json", import.meta.url)).json();
const localeCodes = ["en", "ko", "de", "pl", "es"] as const;
const locales = new Map(
  await Promise.all(localeCodes.map(async (locale) => [
    locale,
    await Bun.file(new URL(`../src/i18n/${locale}.json`, import.meta.url)).json(),
  ] as const)),
);

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, shape(child)]).sort(([a], [b]) =>
        String(a).localeCompare(String(b)),
      ),
    );
  }
  return typeof value;
}

function emptyStrings(value: unknown, path = "$", found: string[] = []): string[] {
  if (typeof value === "string" && !value.trim()) found.push(path);
  else if (Array.isArray(value)) value.forEach((child, index) => emptyStrings(child, `${path}[${index}]`, found));
  else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, child]) => emptyStrings(child, `${path}.${key}`, found));
  }
  return found;
}

const enIds = en.docs.map((page: { id: string }) => page.id);
const sourceIds = Object.keys(en.sourcePaths).sort();
const empty = [...locales].flatMap(([locale, copy]) => emptyStrings(copy, locale));
const sectionsWithoutExamples = en.docs.flatMap((page: { id: string; sections: { code?: string }[] }) =>
  page.sections.flatMap((section, index) =>
    section.code || examples[page.id]?.[index]?.code ? [] : [`${page.id}#${index}`],
  ),
);
const mismatches = [...locales].filter(([locale, copy]) =>
  JSON.stringify(shape(en)) !== JSON.stringify(shape(copy)) ||
  enIds.join("|") !== copy.docs.map((page: { id: string }) => page.id).join("|"),
).map(([locale]) => locale);

if (
  sourceIds.join("|") !== [...enIds].sort().join("|") ||
  empty.length ||
  mismatches.length ||
  sectionsWithoutExamples.length
) {
  console.error("Locale shape mismatch: locale keys or array lengths differ from English.");
  if (mismatches.length) console.error(`Mismatched locales: ${mismatches.join(", ")}`);
  if (empty.length) console.error(`Empty copy values: ${empty.join(", ")}`);
  if (sectionsWithoutExamples.length) console.error(`Sections without examples: ${sectionsWithoutExamples.join(", ")}`);
  process.exitCode = 1;
} else {
  const pages = en.docs.length;
  const sections = en.docs.reduce((sum: number, page: { sections: unknown[] }) => sum + page.sections.length, 0);
  console.log(`Locale keys complete: ${pages} docs, ${sections} sections with examples across ${localeCodes.join(", ")}.`);
}
