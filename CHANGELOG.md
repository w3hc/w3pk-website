# Changelog

## Unreleased

### Changed

- Synced with genji template v3.1.1 (previously on an unpinned pre-v3.0.0 snapshot): restored the CSP / security-headers block in `next.config.ts` (was missing entirely), bumped dependencies (`w3pk` 0.9.3 → 0.10.2, chakra, next, react, etc.), added `pnpm.overrides`/`onlyBuiltDependencies` and `pnpm-workspace.yaml`, synced `W3PK.tsx` and `settings/page.tsx` to the new w3pk API surface (persistent session controls, disabled AI-inspection feature), expanded `src/translations/index.ts` to the full genji key set across all 10 locales, and brought the login button's auth flow and copy in `Header.tsx` back in line with genji
- Minting now goes through the `/api/mint-nft` relayer route instead of a direct client-signed transaction, since `safeMint` is owner-restricted on-chain
