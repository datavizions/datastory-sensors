<script lang="ts">
    type Persona = {
        id: string;
        name: string;
        age: number;
        gender: string;
        job: string;
        tag: string;
        color: string;
        emoji: string;
        narrative: string;
        quote: string;
        quote2: string;
        scene: string;
        subline: string;
        filters: Record<string, string>;
    };

    type Props = {
        persona: Persona;
        selected?: boolean;
        compact?: boolean;
        onclick?: (event: MouseEvent) => void;
    };

    let { 
        persona,
        selected,
        compact = false,
        onclick = () => {},
    }:Props = $props();

</script>

<!--To DO fix button-->
<button onclick={onclick} class="persona-card" class:persona-selected={selected} class:persona-compact={compact} style="--p:{persona.color}" >
    <div class="persona-avatar">{persona.emoji}</div>
    <div class="persona-info">
        <div class="persona-card-name">{persona.name}, {persona.age}</div>
        <div class="persona-card-role">{persona.gender}, {persona.job}</div>
        <div class="persona-card-tag">{persona.tag}</div>
    </div>
    {#if !compact}
        <div class="persona-card-badge">Persona</div>
    {/if}
</button>

<style>
    .persona-card {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 0.7rem;
        padding: 0.8rem;
        border-radius: 0.5rem;
        background-color: var(--story-surface);
        color: var(--story-onbg);
        border: 2px solid transparent;
        cursor: pointer;
    }

    .persona-selected {
        border-color: var(--p);
    }

    .persona-avatar {
        font-size: 2rem;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;    
        flex-shrink: 0;
        background-color: color-mix(in srgb, var(--color-on-bg) 10%, transparent);
        border-radius: 50%;
    }

    .persona-info {
        flex: 1;
    }

    .persona-card-name {
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--p);
    }

    .persona-card-role {
        font-size: 0.8rem;
        color: color-mix(in srgb, var(--color-on-bg) 10%, transparent);
    }

    .persona-card-tag {
        font-size: 0.7rem;
        background: color-mix(in srgb, var(--color-on-bg) 10%, transparent);
        color: var(--p);
    }

    .persona-card-badge {
        margin-left: auto;
        padding: 0.2rem 0.5rem;
        border-radius: 0.25rem;
        background-color: var(--p);
        color: var(--story-bg);
        font-size: 0.7rem;
        font-weight: 600;
    }

    .persona-compact .persona-info,
    .persona-compact .persona-card-badge {
        display: none;
    }
</style>