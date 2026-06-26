<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        title = '',
        code = '',
        placeholder = false,
        children
    }: {
        title?: string;
        code?: string;
        placeholder?: boolean;
        children?: Snippet; 
    } = $props();
</script>

<div class="chart-block">
    <div class="chart-block-header">
        <span class="chart-block-title">{title}</span>
        {#if code}
            <span class="chart-block-badge">{code}</span>
        {/if}
    </div>
    <div class="chart-block-body">
        {#if children}
            {@render children()}
        {:else if placeholder}
            <div class="chart-block-placeholder">Chart Platzhalten</div>
        {/if}
    </div>
</div>

<style>
    .chart-block {
        gap: 0.5rem;
        padding: 1rem;
        background-color: var(--color-background);
        border-left: 4px solid var(--accent);
        overflow: hidden;
    }

    .chart-block-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.5rem;
        border-bottom: 1px solid var(--color-gray);
    }

    .chart-block-title {
        font-family: var(--font-mono);
        font-size: 0.8em;
        font-weight: 600;
        color: var(--color-white);
    }

    .chart-block-badge {
        font-size: 0.6em;
        font-weight: 600;
        background-color: var(--accent);
        flex-shrink: 0;
        white-space: nowrap;
        padding: 0.2rem 0.5rem;
        border-radius: 0.25rem;
        color: var(--color-gray);
    }

    .chart-block-body {
        padding: 0.9rem 0 0 0;
    }

    .chart-block-placeholder {
        font-size: 1em;
        font-weight: 400;
        font-family: var(--font-sans);
        padding: 1.5rem 0;
        color: var(--color-gray);
    }
</style>