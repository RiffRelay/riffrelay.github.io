import { Navigate, useParams } from "react-router-dom";
import type { Copy } from "../../types";
import { NotFoundPage } from "../site/NotFoundPage";

export function LegacyDocsRedirect({ copy }: { copy: Copy }) {
  const { slug = "overview" } = useParams();
  if (slug === "command-catalog" || slug === "bot-commands") {
    return <Navigate replace to={`/docs/bot/${slug}`} />;
  }
  if (!copy.docs.some((doc) => doc.id === slug)) return <NotFoundPage copy={copy} />;
  return <Navigate replace to={`/docs/api/${slug}`} />;
}
