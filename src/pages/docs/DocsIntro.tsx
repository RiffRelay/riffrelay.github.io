import { ArrowUpRight, BookOpen } from "lucide-react";
import { Text } from "@language-lit/material3-expressive";
import type { Copy } from "../../types";
import type { DocsKind } from "./model";

export function DocsIntro({ copy, kind }: { copy: Copy; kind: DocsKind }) {
  const isApi = kind === "api";

  return (
    <div className="docs-intro">
      <div className="eyebrow">
        <BookOpen size={14} aria-hidden="true" />
        {isApi ? copy.docsShell.apiEyebrow : copy.docsShell.botEyebrow}
      </div>
      <Text as="h1" variant="displayMedium">{isApi ? copy.docsShell.apiTitle : copy.docsShell.botTitle}</Text>
      <p>{isApi ? copy.docsShell.apiIntro : copy.docsShell.botIntro}</p>
      {isApi && (
        <a className="official-doc-link" href="https://listenbrainz.readthedocs.io/en/latest/users/api/index.html" target="_blank" rel="noreferrer">
          {copy.docsShell.officialReference}<ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
