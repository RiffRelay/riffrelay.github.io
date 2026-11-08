# RiffRelay website

The public RiffRelay Discord-bot site and its source-grounded ListenBrainz API guides.

## Development

```sh
bun install --frozen-lockfile
bun run dev
bun run typecheck
bun run check:i18n
bun run build
```

The app is React + TypeScript + Vite. Its default locale follows the browser
language (English, Korean, German, Polish, or Spanish) and can be changed from
the header. Website and documentation copy lives in `src/i18n/`; run
`bun run check:i18n` to verify that all locale trees remain structurally complete.

The checked-in command catalog is the build-time fallback. The publishing
workflow checks out the bot source and refreshes the catalog before building;
local builds do not depend on a sibling bot checkout.

Material 3 Expressive provides the React provider, typography, buttons and cards.
Custom site CSS owns the layout, Discord message preview, brand palette and
responsive composition. Display and body fonts are bundled locally.

## Documentation sources

API details are maintained against the sibling
[listenbrainz-api](https://github.com/RiffRelay/listenbrainz-api) source and
its documentation. Bot command behavior is checked against the
[RiffRelay bot](https://github.com/RiffRelay/RiffRelayBot). The live
[ListenBrainz API reference](https://listenbrainz.readthedocs.io/en/latest/users/api/index.html)
remains authoritative for service behavior that can change.

The site uses the project-owned [RiffRelay brand assets](https://github.com/RiffRelay/Branding).
RiffRelay is an independent, unofficial project and is not affiliated with or
endorsed by ListenBrainz or MusicBrainz.
