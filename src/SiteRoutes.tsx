import { Route, Routes } from "react-router-dom";
import type { Copy } from "./types";
import { DocsPage } from "./pages/DocsPage";
import { LegacyDocsRedirect } from "./pages/docs/LegacyDocsRedirect";
import { HomePage } from "./pages/HomePage";
import { FaqPage } from "./pages/site/FaqPage";
import { NotFoundPage } from "./pages/site/NotFoundPage";
import { PrivacyPage } from "./pages/site/PrivacyPage";

export function SiteRoutes({ copy }: { copy: Copy }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage copy={copy} />} />
      <Route path="/docs/api" element={<DocsPage copy={copy} kind="api" />} />
      <Route path="/docs/api/:slug" element={<DocsPage copy={copy} kind="api" />} />
      <Route path="/docs/bot" element={<DocsPage copy={copy} kind="bot" />} />
      <Route path="/docs/bot/:slug" element={<DocsPage copy={copy} kind="bot" />} />
      <Route path="/faq" element={<FaqPage copy={copy} />} />
      <Route path="/privacy" element={<PrivacyPage copy={copy} />} />
      <Route path="/docs/:slug?" element={<LegacyDocsRedirect copy={copy} />} />
      <Route path="*" element={<NotFoundPage copy={copy} />} />
    </Routes>
  );
}
