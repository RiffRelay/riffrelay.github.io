import type { Copy } from "../../types";

export function MobileMenuToggle({ copy, open, onToggle }: { copy: Copy; open: boolean; onToggle: () => void }) {
  return (
    <button
      className="mobile-menu-toggle"
      type="button"
      onClick={onToggle}
      aria-label={open ? copy.header.close : copy.header.menu}
      aria-expanded={open}
      aria-controls="primary-navigation"
    >
      <span className="menu-glyph" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
