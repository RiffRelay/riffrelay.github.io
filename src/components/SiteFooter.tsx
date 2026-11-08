import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Copy } from "../types";

export function SiteFooter({ copy }: { copy: Copy }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="brand-lockup">
              <img src={`${import.meta.env.BASE_URL}branding/riffrelay-icon.svg`} alt="" />
              <span>{copy.home.footerBrand}</span>
            </Link>
            <p>{copy.home.footerNote}</p>
            <p className="footer-made">{copy.home.footerMade}</p>
          </div>
          <div className="footer-links">
            <h2>{copy.home.footerDocs}</h2>
            <Link to="/docs/api/overview">{copy.header.apiDocs}</Link>
            <Link to="/docs/bot/command-catalog">{copy.header.commandCatalog}</Link>
            <Link to="/faq">{copy.sitePages.faqLink}</Link>
            <Link to="/privacy">{copy.sitePages.privacyLink}</Link>
            <a href="https://listenbrainz.org" target="_blank" rel="noreferrer">
              {copy.home.footerListenBrainz}<ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
          <div className="footer-links">
            <h2>{copy.home.footerGithub}</h2>
            <a href="https://github.com/RiffRelay/RiffRelayBot" target="_blank" rel="noreferrer">
              {copy.home.footerBotRepo}<ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a href="https://github.com/RiffRelay/listenbrainz-api" target="_blank" rel="noreferrer">
              {copy.home.footerApiRepo}<ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a href="https://github.com/RiffRelay/Branding" target="_blank" rel="noreferrer">
              {copy.home.footerBrandRepo}<ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {copy.home.footerBrand}</span>
          <span>{copy.home.footerAttribution}</span>
        </div>
      </div>
    </footer>
  );
}
