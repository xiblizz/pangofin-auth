<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>SvelteKit + Bun Template</title>
	<meta name="description" content="SvelteKit template with Bun, native JS, Svelte CSS, and a shadcn-slate dark UI kit." />
</svelte:head>

<div class="page">

	<!-- ── Hero ────────────────────────────────────────────── -->
	<header class="hero">
		<div class="container-md">
			<h1 class="hero-title">SvelteKit + Bun</h1>
			<p class="hero-description">
				A minimal template with native JS, Svelte component CSS, and a shadcn-inspired
				Slate dark UI kit — zero dependencies beyond SvelteKit.
			</p>
			<div class="hero-badges">
				<span class="badge badge-default">SvelteKit</span>
				<span class="badge badge-secondary">Bun</span>
				<span class="badge badge-outline">Native JS</span>
				<span class="badge badge-outline">Svelte CSS</span>
				<span class="badge badge-outline">Dark UI</span>
			</div>
			<div class="hero-actions">
				<button class="btn btn-primary">Get Started</button>
				<button class="btn btn-outline">View on GitHub</button>
				<button class="btn btn-ghost">Documentation</button>
			</div>
		</div>
	</header>

	<!-- ── API Demo ─────────────────────────────────────────── -->
	<section class="section">
		<div class="container-md">
			<h2 class="section-title">API Route</h2>
			<p class="section-description">
				Response from <code>GET /api/hello</code> fetched via SvelteKit's
				<code>load</code> function in <code>+page.js</code>.
			</p>

			<div class="api-card">
				<div class="api-row">
					<span class="api-label">message</span>
					<span class="api-value">{data.greeting.message}</span>
				</div>
				<div class="api-row">
					<span class="api-label">timestamp</span>
					<span class="api-value api-mono">{data.greeting.timestamp}</span>
				</div>
			</div>

			<pre class="code-block">{`// src/routes/api/hello/+server.js
import { json } from '@sveltejs/kit';

export function GET({ url }) {
  const name = url.searchParams.get('name') ?? 'World';
  return json({ message: \`Hello, \${name}!\`, timestamp: new Date().toISOString() });
}

// src/routes/+page.js
export async function load({ fetch }) {
  const res = await fetch('/api/hello?name=SvelteKit');
  return { greeting: await res.json() };
}`}</pre>
		</div>
	</section>

	<!-- ── Buttons ──────────────────────────────────────────── -->
	<section class="section">
		<div class="container">
			<h2 class="section-title">Buttons</h2>
			<p class="section-description">Available button variants and sizes.</p>

			<div class="group">
				<button class="btn btn-primary">Primary</button>
				<button class="btn btn-secondary">Secondary</button>
				<button class="btn btn-outline">Outline</button>
				<button class="btn btn-ghost">Ghost</button>
				<button class="btn btn-destructive">Destructive</button>
				<button class="btn btn-link">Link</button>
			</div>

			<div class="group">
				<button class="btn btn-primary btn-sm">Small</button>
				<button class="btn btn-primary">Default</button>
				<button class="btn btn-primary btn-lg">Large</button>
				<button class="btn btn-outline" disabled>Disabled</button>
			</div>
		</div>
	</section>

	<!-- ── Badges ───────────────────────────────────────────── -->
	<section class="section">
		<div class="container">
			<h2 class="section-title">Badges</h2>
			<p class="section-description">Status indicators and labels.</p>

			<div class="group">
				<span class="badge badge-default">Default</span>
				<span class="badge badge-secondary">Secondary</span>
				<span class="badge badge-outline">Outline</span>
				<span class="badge badge-destructive">Destructive</span>
				<span class="badge badge-success">Success</span>
			</div>
		</div>
	</section>

	<!-- ── Cards ────────────────────────────────────────────── -->
	<section class="section">
		<div class="container">
			<h2 class="section-title">Cards</h2>
			<p class="section-description">Content containers with header, body, and footer.</p>

			<div class="cards-grid">
				<div class="card">
					<div class="card-header">
						<h3 class="card-title">Project Alpha</h3>
						<p class="card-description">A blazing-fast web application built with SvelteKit and Bun.</p>
					</div>
					<div class="card-content">
						<p class="muted">Leverage native JavaScript and Svelte's scoped CSS for a lean, maintainable codebase.</p>
					</div>
					<div class="card-footer">
						<button class="btn btn-primary btn-sm">Open</button>
						<button class="btn btn-ghost btn-sm">Settings</button>
					</div>
				</div>

				<div class="card">
					<div class="card-header">
						<h3 class="card-title">Analytics</h3>
						<p class="card-description">Real-time metrics for your application.</p>
					</div>
					<div class="card-content">
						<div class="flex-col gap-4">
							<div>
								<div class="flex justify-between mb-2">
									<span class="small">Performance</span>
									<span class="small muted">65%</span>
								</div>
								<div class="progress">
									<div class="progress-bar" style="width: 65%;"></div>
								</div>
							</div>
							<div>
								<div class="flex justify-between mb-2">
									<span class="small">Coverage</span>
									<span class="small muted">82%</span>
								</div>
								<div class="progress">
									<div class="progress-bar" style="width: 82%;"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="card-footer">
						<span class="badge badge-success">Live</span>
						<span class="muted small">Updated just now</span>
					</div>
				</div>

				<div class="card">
					<div class="card-header">
						<h3 class="card-title">Team</h3>
						<p class="card-description">Manage your project collaborators.</p>
					</div>
					<div class="card-content flex-col gap-3">
						{#each [
							{ initials: 'AJ', name: 'Alice Johnson', role: 'Lead Dev' },
							{ initials: 'BK', name: 'Bob Kim',       role: 'Designer' },
							{ initials: 'CL', name: 'Carol Lee',     role: 'DevOps' },
						] as member}
							<div class="flex items-center gap-3">
								<div class="avatar">{member.initials}</div>
								<div>
									<p class="small mb-0" style="font-weight: var(--font-medium);">{member.name}</p>
									<p class="muted mb-0">{member.role}</p>
								</div>
								<span class="badge badge-outline" style="margin-left: auto;">Active</span>
							</div>
						{/each}
					</div>
					<div class="card-footer">
						<button class="btn btn-outline btn-sm w-full">Add Member</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ── Form Controls ────────────────────────────────────── -->
	<section class="section">
		<div class="container">
			<h2 class="section-title">Form Controls</h2>
			<p class="section-description">Input, textarea, and select components.</p>

			<div class="card" style="max-width: 36rem;">
				<div class="card-header">
					<h3 class="card-title">Create Account</h3>
					<p class="card-description">Fill in your details to get started.</p>
				</div>
				<div class="card-content flex-col gap-4">
					<div class="form-grid">
						<div class="form-item">
							<label class="label" for="first-name">First name</label>
							<input id="first-name" class="input" type="text" placeholder="Alice" />
						</div>
						<div class="form-item">
							<label class="label" for="last-name">Last name</label>
							<input id="last-name" class="input" type="text" placeholder="Johnson" />
						</div>
					</div>
					<div class="form-item">
						<label class="label" for="email">Email</label>
						<input id="email" class="input" type="email" placeholder="alice@example.com" />
						<span class="form-message">We'll never share your email.</span>
					</div>
					<div class="form-item">
						<label class="label" for="role">Role</label>
						<select id="role" class="select">
							<option value="">Select a role…</option>
							<option>Developer</option>
							<option>Designer</option>
							<option>Manager</option>
						</select>
					</div>
					<div class="form-item">
						<label class="label" for="bio">Bio</label>
						<textarea id="bio" class="textarea" placeholder="Tell us about yourself…" rows="3"></textarea>
					</div>
				</div>
				<div class="card-footer">
					<button class="btn btn-primary">Create Account</button>
					<button class="btn btn-ghost">Cancel</button>
				</div>
			</div>
		</div>
	</section>

	<!-- ── Alerts ───────────────────────────────────────────── -->
	<section class="section">
		<div class="container" style="max-width: 42rem;">
			<h2 class="section-title">Alerts</h2>
			<p class="section-description">Contextual feedback messages.</p>

			<div class="flex-col gap-4">
				<div class="alert">
					<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
					<div class="alert-content">
						<p class="alert-title">Information</p>
						<p class="alert-description">Your session will expire in 30 minutes. Save your work.</p>
					</div>
				</div>

				<div class="alert alert-success">
					<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
					<div class="alert-content">
						<p class="alert-title">Deployment successful</p>
						<p class="alert-description">Your app has been deployed to production.</p>
					</div>
				</div>

				<div class="alert alert-destructive">
					<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<div class="alert-content">
						<p class="alert-title">Build failed</p>
						<p class="alert-description">There were 3 errors during the build process. Check the logs.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ── Table ────────────────────────────────────────────── -->
	<section class="section">
		<div class="container">
			<h2 class="section-title">Table</h2>
			<p class="section-description">Data display with hover states.</p>

			<div class="table-wrapper">
				<table class="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Status</th>
							<th>Runtime</th>
							<th>Stars</th>
						</tr>
					</thead>
					<tbody>
						{#each [
							{ name: 'sveltekit-bun-template', status: 'Active',    runtime: 'Bun 1.x',   stars: '1.2k' },
							{ name: 'vite-plugin-svelte',     status: 'Active',    runtime: 'Node 20+',  stars: '4.8k' },
							{ name: 'shadcn-svelte',          status: 'Active',    runtime: 'Node 18+',  stars: '3.1k' },
							{ name: 'legacy-app',             status: 'Archived',  runtime: 'Node 16',   stars: '0.5k' },
						] as row}
							<tr>
								<td><code>{row.name}</code></td>
								<td>
									<span class="badge {row.status === 'Active' ? 'badge-success' : 'badge-secondary'}">
										{row.status}
									</span>
								</td>
								<td class="muted">{row.runtime}</td>
								<td>{row.stars}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<!-- ── Skeletons + Spinners ─────────────────────────────── -->
	<section class="section">
		<div class="container">
			<h2 class="section-title">Loading States</h2>
			<p class="section-description">Skeleton loaders and spinners.</p>

			<div class="flex gap-8 flex-wrap">
				<div class="skeleton-group" style="flex: 1; min-width: 14rem;">
					<div class="skeleton-row">
						<div class="skeleton avatar"></div>
						<div class="flex-col gap-2 flex-1">
							<div class="skeleton" style="height: 0.75rem; width: 60%;"></div>
							<div class="skeleton" style="height: 0.625rem; width: 40%;"></div>
						</div>
					</div>
					<div class="skeleton" style="height: 0.75rem; width: 100%;"></div>
					<div class="skeleton" style="height: 0.75rem; width: 85%;"></div>
					<div class="skeleton" style="height: 0.75rem; width: 70%;"></div>
					<div class="skeleton" style="height: 2rem; width: 6rem; border-radius: var(--radius);"></div>
				</div>

				<div class="flex-col gap-4 items-center" style="flex: 0 0 auto;">
					<div class="flex gap-4 items-center">
						<div class="spinner spinner-sm"></div>
						<div class="spinner"></div>
						<div class="spinner spinner-lg"></div>
					</div>
					<p class="muted small">Spinner sizes</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ── Color Palette ────────────────────────────────────── -->
	<section class="section">
		<div class="container">
			<h2 class="section-title">Slate Color Palette</h2>
			<p class="section-description">All 11 slate shades used in this UI kit.</p>

			<div class="color-grid">
				{#each [
					{ shade: '50',  hex: '#f8fafc' },
					{ shade: '100', hex: '#f1f5f9' },
					{ shade: '200', hex: '#e2e8f0' },
					{ shade: '300', hex: '#cbd5e1' },
					{ shade: '400', hex: '#94a3b8' },
					{ shade: '500', hex: '#64748b' },
					{ shade: '600', hex: '#475569' },
					{ shade: '700', hex: '#334155' },
					{ shade: '800', hex: '#1e293b' },
					{ shade: '900', hex: '#0f172a' },
					{ shade: '950', hex: '#020617' },
				] as color}
					<div class="flex-col gap-1 items-center">
						<div class="color-swatch" style="background-color: {color.hex};">
							<span>{color.hex}</span>
						</div>
						<span class="muted" style="font-size: var(--text-xs);">{color.shade}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ── Typography ───────────────────────────────────────── -->
	<section class="section">
		<div class="container-md">
			<h2 class="section-title">Typography</h2>
			<p class="section-description">Type scale and text utilities.</p>

			<div class="flex-col gap-3">
				<p style="font-size: var(--text-4xl); font-weight: var(--font-bold); margin: 0;">Display — Bold 36px</p>
				<p style="font-size: var(--text-3xl); font-weight: var(--font-semibold); margin: 0;">Heading 1 — Semibold 30px</p>
				<p style="font-size: var(--text-2xl); font-weight: var(--font-semibold); margin: 0;">Heading 2 — Semibold 24px</p>
				<p style="font-size: var(--text-xl); font-weight: var(--font-medium); margin: 0;">Heading 3 — Medium 20px</p>
				<p class="lead" style="margin: 0;">Lead paragraph — 20px muted, wider line-height for readability.</p>
				<p style="margin: 0;">Body text — 16px, regular weight. The quick brown fox jumps over the lazy dog.</p>
				<p class="small" style="margin: 0;">Small text — 14px for captions and supporting copy.</p>
				<p class="muted" style="margin: 0;">Muted text — slate-400, used for secondary information.</p>
				<p style="margin: 0;">Inline <code>code</code> and <code>variables</code> in prose.</p>
			</div>
		</div>
	</section>

	<!-- ── Svelte CSS Demo ──────────────────────────────────── -->
	<section class="section">
		<div class="container-md">
			<h2 class="section-title">Svelte Component CSS</h2>
			<p class="section-description">
				Styles live in the component's <code>&lt;style&gt;</code> block — Svelte automatically
				scopes them to the component. Use <code>ui.css</code> tokens anywhere via CSS custom
				properties.
			</p>
			<pre class="code-block">{`<!-- MyComponent.svelte -->
<script>
  // no import needed — styles are co-located below
<` + `/script>

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
</style>`}</pre>
			<p class="muted small">
				CSS custom properties from <code>ui.css</code> are available everywhere,
				while <code>&lt;style&gt;</code> classes are scoped to their component by Svelte's compiler.
			</p>
		</div>
	</section>

	<!-- ── Footer ───────────────────────────────────────────── -->
	<footer class="border-top" style="padding: var(--space-8) var(--space-6); text-align: center;">
		<p class="muted small mb-0">
			SvelteKit + Bun Template — MIT License
		</p>
	</footer>

</div>

<style>
	.page {
		min-height: 100vh;
		background-color: var(--background);
	}

	/* ── Hero ─────────────────────────────────── */
	.hero {
		border-bottom: 1px solid var(--border);
		padding: var(--space-16) var(--space-6);
		text-align: center;
	}

	.hero-title {
		font-size: var(--text-4xl);
		font-weight: var(--font-bold);
		letter-spacing: -0.03em;
		margin-bottom: var(--space-4);
	}

	.hero-description {
		font-size: var(--text-lg);
		color: var(--muted-foreground);
		max-width: 36rem;
		margin: 0 auto var(--space-8);
	}

	.hero-badges {
		display: flex;
		gap: var(--space-2);
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: var(--space-8);
	}

	.hero-actions {
		display: flex;
		gap: var(--space-3);
		justify-content: center;
		flex-wrap: wrap;
	}

	/* ── Sections ─────────────────────────────── */
	.section {
		padding: var(--space-12) var(--space-6);
		border-bottom: 1px solid var(--border);
	}

	.section-title {
		font-size: var(--text-2xl);
		font-weight: var(--font-semibold);
		margin-bottom: var(--space-2);
	}

	.section-description {
		color: var(--muted-foreground);
		font-size: var(--text-sm);
		margin-bottom: var(--space-8);
	}

	.group {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		align-items: center;
		margin-bottom: var(--space-4);
	}

	/* ── API Demo ─────────────────────────────── */
	.api-card {
		background-color: var(--card);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		margin-bottom: var(--space-6);
	}

	.api-row {
		display: flex;
		align-items: baseline;
		gap: var(--space-4);
		padding: var(--space-3) var(--space-4);
		border-bottom: 1px solid var(--border);
	}

	.api-row:last-child {
		border-bottom: none;
	}

	.api-label {
		font-size: var(--text-xs);
		font-weight: var(--font-semibold);
		color: var(--muted-foreground);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		min-width: 6rem;
		flex-shrink: 0;
	}

	.api-value {
		font-size: var(--text-sm);
		color: var(--foreground);
	}

	.api-mono {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--muted-foreground);
	}

	/* ── Code block ───────────────────────────── */
	.code-block {
		background-color: var(--card);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--space-4) var(--space-6);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--slate-300);
		overflow-x: auto;
		margin-bottom: var(--space-4);
	}

	/* ── Cards grid ───────────────────────────── */
	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--space-6);
	}

	/* ── Color palette ────────────────────────── */
	.color-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
		gap: var(--space-2);
	}

	.color-swatch {
		aspect-ratio: 1;
		width: 100%;
		border-radius: var(--radius);
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: var(--space-1);
	}

	.color-swatch span {
		font-size: 0.65rem;
		font-weight: var(--font-semibold);
		color: white;
		text-shadow: 0 1px 2px rgb(0 0 0 / 0.8);
	}

	/* ── Form grid ────────────────────────────── */
	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-4);
	}

	/* ── Loading states ───────────────────────── */
	.skeleton-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.skeleton-row {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	/* ── Responsive ───────────────────────────── */
	@media (max-width: 640px) {
		.hero-title { font-size: var(--text-3xl); }
		.form-grid  { grid-template-columns: 1fr; }
	}
</style>

