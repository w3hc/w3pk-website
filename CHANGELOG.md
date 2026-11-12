# Changelog

## Unreleased

### Added

- Backup step after registration (`BackupStep.tsx`), the iOS Home Screen or backup choice before registration (`HomeScreenChoice.tsx`), and passwordless device sync with its import card and QR code link (`SyncImport.tsx`, `src/utils/syncLink.ts`), from genji 3.3.2
- The registration dialog says when no built-in authenticator is found, and its "I already registered on another device" link opens `/settings#sync-import`

### Changed

- Synced with genji template v3.3.2 (genji `main` at `7441e94`): `W3PK.tsx`, the settings page, the password modal, the utils, the translations and the header's login flow follow genji; the site's `sendTransaction` error handling, branding and menu stay
- Updated `w3pk` to 0.12.4: the wallet on the device is encrypted under a key from the passkey's PRF output, registration needs a passkey with PRF, `PRIMARY` returns a P-256 smart account address, and wallets stored by earlier versions are restored from a backup or a sync file
- `/sig` derives its indexed wallets without the `origin` option, which w3pk removed, and its callout explains that STANDARD addresses are scoped to the site's origin
- `/stealth` shows `user.username`, since w3pk dropped `displayName`
- Updated dependencies: `next` / `eslint-config-next` 16.4.3, `react` / `react-dom` 19.3.1, `@chakra-ui/react` 3.37.0, `tsup` 9.0.0, and patched `pnpm.overrides` floors
- The docs page loads the selected document inside its effect, as the `react-hooks/immutability` rule in `eslint-config-next` 16.4.3 requires
- Synced with genji template v3.1.1 (previously on an unpinned pre-v3.0.0 snapshot): restored the CSP / security-headers block in `next.config.ts` (was missing entirely), bumped dependencies (`w3pk` 0.9.3 → 0.10.2, chakra, next, react, etc.), added `pnpm.overrides`/`onlyBuiltDependencies` and `pnpm-workspace.yaml`, synced `W3PK.tsx` and `settings/page.tsx` to the new w3pk API surface (persistent session controls, disabled AI-inspection feature), expanded `src/translations/index.ts` to the full genji key set across all 10 locales, and brought the login button's auth flow and copy in `Header.tsx` back in line with genji
- Minting now goes through the `/api/mint-nft` relayer route instead of a direct client-signed transaction, since `safeMint` is owner-restricted on-chain

### Removed

- `react-markdown`, `remark-gfm` and `rehype-highlight`, which nothing imports
- w3pk's optional `circomlibjs` dependency, through a pnpm override: `/zk` only shows code samples

### Fixed

- Build verification no longer fails with `Failed to fetch`: `connect-src` in `next.config.ts` allows `https://registry.npmjs.org` instead of `https://unpkg.com`, since w3pk 0.12.4's `getCurrentBuildHash()` downloads the published tarball from the npm registry

### Security

- `next` 16.4.3 fixes two critical and one high advisory
- CI builds on Node.js 24, and `package.json` requires Node.js `>=24.22.1`
