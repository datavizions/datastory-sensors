// define what bars should show
// horizontal setup + vertical setup

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
        size = 200,
        inner = 0.5
        }: {
        items: Item[];
        title?: string;
        note?: string;
        colors?: string[];
        size?: number;
        inner?: number;
    } = $props();


    const r = $derived(size / 2);
    const innerR = $derived(r * inner);

    const pies = pie<Item>().value((d) => d.count).padAngle(0.01).sort(null);

    const visibleItems = $derived(items.filter(i => i.count > 0));

    const arcs = $derived(arc<any>().innerRadius(innerR).outerRadius(r).cornerRadius(5)
    );

    const slices = $derived(pies(visibleItems));

</script>

<div class="donut">
    {#if title}
        <p class="donut-title">{title}</p>
    {/if}

    <div class="donut-layout">
        <svg width={size} height={size} aria-label={title}>
            <g transform="translate({r}, {r})">
            {#each slices as slice, i }
            <path class="donut-slice" d={arcs(slice)} fill={colors[i % colors.length]} stroke="var(--color-background)" stroke-width="1"></path>
            <title>{slice.data.label}: {slice.data.percent}% ({slice.data.count})</title>
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

// add styles for the bar chart here for now put later to a style sheet
<style>

    .donut {
        font-size: 0.9rem;
    }

    .donut-title {
        font-weight: 600;
        margin-bottom: 0.5em;
    }

    .donut-legend {
       list-style: none;
       padding: 0;
       margin: 0;
       display: flex;
       flex-direction: column;
       gap: 0.5rem;
    }

    .donut-legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9em;
    }

    .donut-legend-label {
        flex:1;
        color: var(--color-gray);
    }

    .donut-legend-percent {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9em;
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
        align-items: center;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .donut-layout svg {
        flex-shrink: 0;
        display: block;
    }

    .donut-slice {
        transition: opacity 180ms ease;
    }

    .donut-slice:hover {
        opacity: 1;
    }

    .donut-note {
        font-size: 0.8em;
        margin-top: 0.5em;
        color: var(--color-gray);
    }

</style>

                

