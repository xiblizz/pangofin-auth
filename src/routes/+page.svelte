<script>
    import login from '$lib/login'

    let { data } = $props()

    let username = ''
    let password = ''
    let message = ''
    let loading = false
    let success = false

    async function handleLogin() {
        message = ''
        loading = true
        success = false
        try {
            data = await login(username, password)
            if (data?.success) {
                success = true
                message = 'Authentication successful!'
            }
        } catch (err) {
            message = err?.message || 'Authentication failed!'
        } finally {
            loading = false
        }
    }

    if (data?.hasAccess) {
        success = true
        message = 'Already authenticated!'
    }
</script>

<svelte:head>
    <title>Auth</title>
</svelte:head>

<div class="page">
    <div class="form-wrapper">
        <div
            class="form-grid"
            class:blurred={loading || success}
        >
            <div class="form-item">
                <label
                    class="label"
                    for="username">Username</label
                >
                <input
                    id="username"
                    class="input"
                    type="text"
                    bind:value={username}
                    disabled={loading || success}
                />
            </div>
            <div class="form-item">
                <label
                    class="label"
                    for="password">Password</label
                >
                <input
                    id="password"
                    class="input"
                    type="password"
                    bind:value={password}
                    disabled={loading || success}
                    on:keydown={(e) => e.key === 'Enter' && handleLogin()}
                />
            </div>

            <button
                class="btn"
                on:click={handleLogin}
                disabled={loading || success}>Login</button
            >
        </div>

        {#if message}
            <div
                class="message"
                class:success
                class:error={!success}
            >
                {message}
                {#if data?.links.length > 0}
                    <div class="links">
                        {#each data.links as link}
                            <a
                                href={link.href}
                                class="btn link">{link.text}</a
                            >
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}

        {#if loading}
            <div class="overlay">
                <div class="spinner"></div>
            </div>
        {/if}
    </div>
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: w;
    }

    .form-grid {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
    }

    .form-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .label {
        margin: 0;
        font-weight: 300;
        min-width: 10ch;
    }

    .form-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .blurred {
        filter: blur(4px);
        pointer-events: none;
        user-select: none;
    }

    .overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(5, 5, 5, 0.8);
        border: 1px solid var(--slate-800);
        border-radius: var(--radius);
    }

    .spinner {
        width: 2rem;
        height: 2rem;
        border: 3px solid rgba(255, 255, 255, 0.2);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .message {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--slate-800, #1e1e1e);
        border: 1px solid var(--slate-600, #2e2e2e);
        border-radius: var(--radius-sm);
        padding: 1rem 2rem;
        color: var(--red-500, #ef4444);
        font-size: 0.875rem;
        text-align: center;
        white-space: nowrap;
    }

    .message.error {
        border-color: var(--red-500, #ef4444);
        color: var(--red-500, #ef4444);
    }

    .message.success {
        /* border-color: var(--green-500, #22c55e); */
        color: var(--green-500, #22c55e);
    }

    .links {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }

    .link {
        border: 1px solid #6e75cc;
        padding: 1rem 2rem;
        background-color: var(--slate-800, #1e1e1e);
        border-radius: var(--radius-sm);
        text-align: center;
        text-decoration: none;
        color: hsl(236, 48%, 62%);
        transition: 200ms ease;

        &:hover {
            background-color: var(--slate-700, #2e2e2e);
            color: hsl(236, 52%, 66%);
        }
    }
</style>
