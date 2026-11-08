import { Text } from "@language-lit/material3-expressive";
import catalog from "../../generated/command-catalog.json";
import type { Copy } from "../../types";

export function CommandCatalog({ copy, query }: { copy: Copy; query: string }) {
  const needle = query.trim().toLocaleLowerCase();
  const commands = catalog.commands.filter((command) => !needle || [
    command.name, command.description, command.category, copy.catalogCategories[command.category] ?? "",
    ...command.aliases, command.usage ?? "", ...command.examples,
    ...command.options.flatMap((option) => [option.name, option.description]),
  ].join(" ").toLocaleLowerCase().includes(needle));
  const categories = [...new Set(catalog.commands.map((command) => command.category))];

  return (
    <div className="command-catalog">
      <p className="catalog-note">{copy.docsShell.generatedNote}</p>
      <p className="catalog-count">{commands.length} {copy.docsShell.catalogCommands}</p>
      {categories.map((category) => {
        const categoryCommands = commands.filter((command) => command.category === category);
        if (!categoryCommands.length) return null;
        return (
          <section className="catalog-category" key={category}>
            <Text as="h3" variant="titleLarge">{copy.catalogCategories[category] ?? category}</Text>
            {categoryCommands.map((command) => (
              <article className="catalog-command" key={command.name}>
                <div className="catalog-command-title">
                  <code>/{command.name}</code>
                  {command.aliases.length > 0 && <span>{copy.docsShell.aliases}: {command.aliases.map((alias) => `!${alias}`).join(", ")}</span>}
                </div>
                <p>{command.description}</p>
                {command.usage && <p className="catalog-usage"><strong>{copy.docsShell.usage}:</strong> <code>{command.slashOnly ? "/" : "!"}{command.usage}</code></p>}
                {command.options.length > 0 && (
                  <ul className="catalog-options">
                    {command.options.map((option) => (
                      <li key={option.name}>
                        <code>{option.name}</code><span>{option.description}</span>
                        <small>{option.type} · {("required" in option && option.required) ? copy.docsShell.required : copy.docsShell.optional}</small>
                      </li>
                    ))}
                  </ul>
                )}
                {command.examples.length > 0 && <p className="catalog-examples"><strong>{copy.docsShell.examples}:</strong> {command.examples.map((example) => `\`${command.slashOnly ? "/" : "!"}${example}\``).join(" · ")}</p>}
                <div className="catalog-badges">
                  {command.guildOnly && <span>{copy.docsShell.guildOnly}</span>}
                  {command.slashOnly && <span>{copy.docsShell.slashOnly}</span>}
                  {command.slow && <span>{copy.docsShell.deferred}</span>}
                  {command.hidden && <span>{copy.docsShell.hidden}</span>}
                  {!command.guildOnly && !command.slashOnly && <span>{copy.docsShell.prefixAndSlash}</span>}
                </div>
              </article>
            ))}
          </section>
        );
      })}
    </div>
  );
}
