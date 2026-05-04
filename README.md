# sveltekit-bun-template

A minimal [SvelteKit](https://kit.svelte.dev) template using [Bun](https://bun.sh) as the package manager and runtime, **native JavaScript** (no TypeScript), **Svelte component-internal CSS** for scoped styles, and a **shadcn-inspired Slate dark UI kit** in `src/lib/ui.css`.

## Features

- ⚡ **[Bun](https://bun.sh)** — fast package manager and runtime
- 🧩 **[SvelteKit](https://kit.svelte.dev)** with Svelte 5
- 🟨 **Native JavaScript** — no TypeScript configuration
- 🎨 **Svelte `<style>`** — co-located scoped CSS inside every `.svelte` component
- 🌑 **`ui.css`** — shadcn-inspired Slate dark UI kit with CSS custom properties
- 🔌 **API routes** — boilerplate `GET /api/hello` endpoint via `+server.js`
- 🚫 **Zero UI dependencies** — all styles are plain CSS

## Quickstart

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Project Structure

```
src/
├── app.html              # HTML entry point
├── app.css               # Global styles (imports ui.css)
├── lib/
│   ├── ui.css            # Shadcn-slate dark UI kit
│   ├── utils.js          # Shared utilities (cn helper)
│   └── index.js          # Library entry point
└── routes/
    ├── +layout.svelte    # Root layout
    ├── +page.js          # Load function (fetches from /api/hello)
    ├── +page.svelte      # Demo / showcase page (styles in <style> block)
    └── api/
        └── hello/
            └── +server.js  # GET /api/hello endpoint
```

## `ui.css` — Shadcn Slate Dark UI Kit

`src/lib/ui.css` provides a complete dark theme based on the Slate color palette (shadcn-style). It is imported globally via `app.css` and all CSS custom properties are available everywhere.

### Design Tokens

```css
/* Colors */
--background        /* slate-950  #020617 */
--foreground        /* slate-50   #f8fafc */
--card              /* slate-900  #0f172a */
--primary           /* slate-50   #f8fafc */
--secondary         /* slate-800  #1e293b */
--muted             /* slate-800  #1e293b */
--muted-foreground  /* slate-400  #94a3b8 */
--accent            /* slate-700  #334155 */
--border            /* slate-800  #1e293b */
--destructive       /* red-900    #7f1d1d */

/* Radius */
--radius-sm / --radius / --radius-lg / --radius-full

/* Typography */
--font-sans / --font-mono
--text-xs … --text-4xl
--font-normal / --font-medium / --font-semibold / --font-bold

/* Shadows, Transitions, Spacing */
--shadow-sm … --shadow-lg
--transition-fast / --transition / --transition-slow
--space-1 … --space-16
```

### Component Classes

| Category      | Classes |
|---------------|---------|
| **Button**    | `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost`, `.btn-destructive`, `.btn-link`, `.btn-sm`, `.btn-lg`, `.btn-icon` |
| **Badge**     | `.badge`, `.badge-default`, `.badge-secondary`, `.badge-outline`, `.badge-destructive`, `.badge-success` |
| **Card**      | `.card`, `.card-header`, `.card-title`, `.card-description`, `.card-content`, `.card-footer` |
| **Form**      | `.input`, `.textarea`, `.select`, `.label`, `.form-item`, `.form-message` |
| **Alert**     | `.alert`, `.alert-destructive`, `.alert-success` |
| **Table**     | `.table-wrapper`, `.table` |
| **Avatar**    | `.avatar`, `.avatar-sm`, `.avatar-lg`, `.avatar-xl` |
| **Loading**   | `.skeleton`, `.spinner`, `.spinner-sm`, `.spinner-lg` |
| **Progress**  | `.progress`, `.progress-bar` |
| **Nav**       | `.nav`, `.nav-item`, `.sidebar-nav`, `.sidebar-nav-item` |
| **Layout**    | `.container`, `.container-sm/md/lg/xl/2xl`, `.flex`, `.flex-col`, `.grid`, `.grid-cols-*` |
| **Typography**| `.lead`, `.muted`, `.small`, `.code`, `h1–h6` |

## Svelte Component CSS

Write styles inside the component's `<style>` block. Svelte's compiler automatically scopes them to the component. `ui.css` CSS custom properties are available everywhere.

```svelte
<!-- MyComponent.svelte -->
<script>
  // no import needed — styles live below
</script>

<div class="wrapper">
  <h2 class="title">Hello</h2>
  <!-- ui.css global classes work alongside local styles -->
  <button class="btn btn-primary">Action</button>
</div>

<style>
  .wrapper {
    padding: var(--space-6);
    background-color: var(--card);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
  }

  .title {
    color: var(--foreground);
    font-size: var(--text-2xl);
    margin-bottom: var(--space-4);
  }
</style>
```

## API Routes

SvelteKit `+server.js` files export HTTP method handlers. Add your endpoints under `src/routes/api/`.

```js
// src/routes/api/hello/+server.js
import { json } from '@sveltejs/kit';

export function GET({ url }) {
  const name = url.searchParams.get('name') ?? 'World';
  return json({ message: `Hello, ${name}!`, timestamp: new Date().toISOString() });
}
```

Fetch from the server or client using SvelteKit's load functions:

```js
// src/routes/+page.js
export async function load({ fetch }) {
  const res = await fetch('/api/hello?name=SvelteKit');
  return { greeting: await res.json() };
}
```

## License

MIT
