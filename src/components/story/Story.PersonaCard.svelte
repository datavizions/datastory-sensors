<script lang="ts">
    let { 
        persona,
        selected,
        compact = false,
        onclick = () => {},
    } = $props();
</script>

<button class="persona-card" class:persona-selected={selected} class:persona-compact={compact} style="--p:{persona.color}" {onclick}>
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