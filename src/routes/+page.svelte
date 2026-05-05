<script>
    import login from '$lib/login'

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
            await login(username, password)
            success = true
        } catch (err) {
            message = err?.message || 'Login failed'
            loading = false
        }
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
            <div class="message error">{message}</div>
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
        top: 100%;
        margin-top: 0.5rem;
        border: 1px solid var(--red-500, #ef4444);
        border-radius: var(--radius-sm);
        padding: 0.75rem 1rem;
        color: var(--red-500, #ef4444);
        font-size: 0.875rem;
        text-align: center;
        white-space: nowrap;
    }
</style>
