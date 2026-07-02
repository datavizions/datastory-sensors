<script lang="ts">
    import {arc, pie} from 'd3-shape'

    interface Item {
        answer: string;
        label: string;
        percent: number;
        count: number;
    }

    let {
        items = [],
        title = '',
        note = '',
        colors = ['var(--color-primary)'],
        size = 320,
        inner = 0.5
        }: {
        items: Item[];
        title?: string;
        note?: string;
        colors?: string[];
        size?: number;
        inner?: number;
    } = $props();

    let layoutWidth = $state(0);

    const chartSize = $derived(layoutWidth > 0 ? Math.min(size, layoutWidth) : size);

    const r = $derived(chartSize / 2);
    const innerR = $derived(r * inner);
    const labelR = $derived((innerR + r) / 2);

    const pies = pie<Item>().value((d) => d.count).padAngle(0.01).sort(null);

    const visibleItems = $derived(items.filter(i => i.count > 0));

    const arcs = $derived(arc<any>().innerRadius(innerR).outerRadius(r).cornerRadius(5)
    );
    const labelArc = $derived(arc<any>().innerRadius(labelR).outerRadius(labelR));

    const slices = $derived(pies(visibleItems));

</script>

<div class="donut">
    {#if title}
        <p class="donut-title">{title}</p>
    {/if}

    <div class="donut-layout" bind:clientWidth={layoutWidth}>
        <svg width={chartSize} height={chartSize} aria-label={title}>
            <g transform="translate({r}, {r})">
            {#each slices as slice, i }
            <path class="donut-slice" d={arcs(slice)} fill={colors[i % colors.length]} stroke="var(--color-background)" stroke-width="1"></path>
            <title>{slice.data.label}: {slice.data.percent}% ({slice.data.count})</title>
            {@const centroid = labelArc.centroid(slice)}
            {#if slice.data.percent >= 6}
                <text
                    x={centroid[0]}
                    y={centroid[1]}
                    class="donut-slice-label"
                    text-anchor="middle"
                    dominant-baseline="middle"
                >
                    {slice.data.percent}%
                </text>
            {/if}
            {/each}
            </g>
        </svg>  

        <ul class="donut-legend">
            {#each visibleItems as item, i}
            <li class="donut-legend-item">
                <span class="donut-legend-swatch" style="background: {colors[i % colors.length]}"></span>
                <span class="donut-legend-label">{item.label}</span>
                <span class="donut-legend-percent">{item.percent}%</span>
            </li>
            {/each}
        </ul>
    </div>
    
    

    {#if note}
        <p class="donut-note">
            {note}
        </p>
    {/if}
</div>

<style>

    .donut {
        font-size: 0.8rem;
        line-height: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .donut-title {
        font-weight: 600;
        margin-bottom: 0.5em;
    }

    /* legend far away is there another option instead of margin */
    .donut-legend {
       list-style: none;
       padding: 0;
       margin: 0;
       display: flex;
       flex-direction: column;
       gap: 0.6rem;
    }

    .donut-legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9em;
    }

    .donut-legend-label {
        flex:1;
        color: color-mix(in srgb, var(--story-on-bg) 70%, transparent);
    }

    .donut-legend-percent {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9em;
        font-family: var(--font-mono);
        color: color-mix(in srgb, var(--story-on-bg) 78%, transparent);
    }

    .donut-legend-swatch {
        display: inline-block;
        width: 1em;
        height: 1em;
        border-radius: 0.25em;
        flex-shrink: 0;
    }

    .donut-layout {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.55rem;
        width: 100%;
        max-width: 32rem;
        margin-inline: auto;
    }

    .donut-layout svg {
        flex-shrink: 0;
        display: block;
        margin-inline: auto;
    }

    .donut-legend {
        width: 100%;
    }

    .donut-slice {
        transition: opacity 180ms ease;
    }

    .donut-slice-label {
        fill: var(--story-on-bg);
        font-family: var(--font-mono);
        font-size: 0.72rem;
        font-weight: 700;
        pointer-events: none;
    }

    .donut-slice:hover {
        opacity: 1;
    }

    .donut-note {
        font-size: 0.8em;
        margin-top: 0.5em;
        color: var(--color-gray);
    }

    @media (min-width: 720px) {
        .donut-layout {
            gap: 0.75rem;
        }
    }

</style>

                

