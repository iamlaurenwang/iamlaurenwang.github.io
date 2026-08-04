# Lauren's Profile

This is Lauren's personal profile site, containing her contact info, resume, small tools, and notes.

## Commands

```sh
npm run dev          # start Vite dev server
npm run build         # type-check then build for production (runs both in parallel)
npm run build-only    # build without type-checking
npm run type-check    # vue-tsc --build (use this, not plain tsc)
npm run preview       # preview the production build locally
npm run format        # prettier --write src/
```

## Tech Stack
- Vue3(Composition API style)
- TypeScript
- Tailwindcss v4

## Project Structure
```
src/
├── components/     # Shared UI components
├── views/          # Page-level components
├── composables/    # Reusable logic (use*.ts)
├── assets/
│   └── main.css    # Tailwind theme / color token definitions
├── types/          # Type definitions
└── router/         # Router configuration
```

## Coding Rules
1. Always use Tailwind CSS utility classes for styling; do not write CSS / SCSS / Sass
2. Only use theme colors defined in main.css; do not use arbitrary hex/rgb color codes
3. Components must always use `<script setup lang="ts">`
4. Naming conventions:
    - Component files: PascalCase (e.g. `ContactCard.vue`)
    - Composables: camelCase, prefixed with `use` (e.g. `useContactForm.ts`)
5. Props / Emits must have explicit types defined; do not use `any`

## Security & Other Guidelines
- Never commit real personal contact info, API keys, or other sensitive data into code or commits; use environment variables or placeholder data instead
- Confirm necessity before adding new third-party dependencies to avoid unnecessary bloat