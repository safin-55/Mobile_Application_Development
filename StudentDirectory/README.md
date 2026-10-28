# StudentDirectory — Manual 5

Complete React Native / Expo / TypeScript project. Requires Node.js 22.13 or a newer supported LTS.

Open this folder in VS Code, then open its terminal:

```bash
npm ci
npm run web
```

Browser: `http://localhost:8085`. To run through Expo Go instead, use `npm start` and scan the QR code using a compatible SDK 57 Expo Go installation.

The root `StudentsProvider` shares the list across all routes. The typed reducer supports add, remove, and reset. The form has no callback props: it dispatches directly and returns through the router. The add route is hidden from the tab bar. Remove and Reset require confirmation; the title count is derived live; duplicate Student IDs show the exact required inline error.

```bash
npm run typecheck
npm test
npx expo install --check
npm run export:web
```

The six initial records are illustrative because the Week 2 source was not supplied. Edit `data/students.ts` to use your own original records. State survives tab changes and resets on full refresh. See the parent README and REQUIREMENTS files for all setup steps and the manual mapping.
