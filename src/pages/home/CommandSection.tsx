import { ArrowRight, BarChart3, Heart, Radio, Search } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { Text } from "@language-lit/material3-expressive";
import catalog from "../../generated/command-catalog.json";
import type { Copy } from "../../types";

export function CommandSection({ copy }: { copy: Copy }) {
  const c = copy.home;
  const rows = [
    [<Radio size={16} />, "/nowplaying", c.commandNow],
    [<BarChart3 size={16} />, "/topartists", c.commandStats],
    [<Heart size={16} />, "/taste", c.commandCompare],
    [<Search size={16} />, "/search", c.commandExplore],
  ] as const;

  return (
    <section className="section commands-section" id="commands">
      <div className="container command-layout">
        <div className="command-intro" data-reveal>
          <div className="eyebrow"><Search size={14} aria-hidden="true" />{c.commandsEyebrow}</div>
          <Text as="h2" variant="headlineLarge">{c.commandsTitle}</Text>
          <p>{c.commandsBody}</p>
          <Link className="text-arrow" to="/docs/bot/command-catalog">
            {copy.header.commandCatalog}<ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="command-board" aria-label={c.commandsTitle} data-reveal>
          <div className="command-board-top"><span>{c.commandBoardTitle}</span><span>{catalog.commands.length}</span></div>
          {rows.map(([icon, name, description]) => (
            <CommandRow key={name} icon={icon} name={name} description={description} />
          ))}
          <div className="command-board-foot">{c.commandFooter.replace(/\b40\b/, String(catalog.commands.length))}</div>
        </div>
      </div>
    </section>
  );
}

function CommandRow({ icon, name, description }: { icon: ReactNode; name: string; description: string }) {
  return <div className="command-row"><span className="command-icon">{icon}</span><code>{name}</code><span>{description}</span></div>;
}
