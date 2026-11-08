import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const output = new URL("../src/generated/command-catalog.json", import.meta.url);
const args = process.argv.slice(2);
if (args.includes("--snapshot-only")) {
  console.log("Using the checked-in command catalog snapshot.");
  process.exit(0);
}
const sourceIndex = args.indexOf("--source");
const sourceArg = sourceIndex >= 0 ? args[sourceIndex + 1] : process.env.RIFFRELAY_BOT_SOURCE;
if (!sourceArg) {
  console.log("No remote bot-source checkout configured; keeping the checked-in command catalog.");
  process.exit(0);
}
const source = resolve(sourceArg);
if (Bun.file(`${source}/src/commands/index.ts`).size === 0) {
  throw new Error(`RiffRelayBot source checkout not found at ${source}.`);
}

const loader = [
  'const { buildRegistry } = await import("./src/commands/index.ts");',
  "const commands = buildRegistry().list().map(({ meta }) => ({",
  "  name: meta.name, description: meta.description, category: meta.category,",
  "  aliases: meta.aliases ?? [], usage: meta.usage ?? null, examples: meta.examples ?? [],",
  "  guildOnly: meta.guildOnly ?? false, slashOnly: meta.slashOnly ?? false,",
  "  hidden: meta.hidden ?? false, slow: meta.slow ?? false, options: meta.options ?? [],",
  "}));",
  "console.log(JSON.stringify({ generatedFrom: 'RiffRelay/RiffRelayBot', commands }));",
].join("\n");
const processResult = Bun.spawn(["bun", "--eval", loader], {
  cwd: source,
  stdout: "pipe",
  stderr: "inherit",
});
const stdout = await new Response(processResult.stdout).text();
const exitCode = await processResult.exited;
if (exitCode !== 0) throw new Error(`Could not load the bot command registry (exit ${exitCode}).`);

const catalog = JSON.parse(stdout) as {
  generatedFrom: string;
  commands: Array<{
    name: string;
    description: string;
    category: string;
    aliases: string[];
    usage: string | null;
    examples: string[];
    guildOnly: boolean;
    slashOnly: boolean;
    hidden: boolean;
    slow: boolean;
    options: Array<{ name: string; description: string; type: string; required?: boolean }>;
  }>;
};
if (!catalog.commands.length || new Set(catalog.commands.map(({ name }) => name)).size !== catalog.commands.length) {
  throw new Error("The bot registry returned no commands or duplicate command names.");
}
await mkdir(new URL("../src/generated/", import.meta.url), { recursive: true });
await Bun.write(output, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Generated ${catalog.commands.length} commands from RiffRelay/RiffRelayBot.`);
