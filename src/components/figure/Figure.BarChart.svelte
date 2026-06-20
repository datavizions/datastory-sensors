// define what bars should show
// horizontal setup + vertical setup

<script lang="ts">
    import {scaleLinear} from 'd3-scale'

    interface Item {
        label: string;
        percent: number;
        count: number;
        code?: string;
    }

    let {
        items = [],
        title = '',
        note = '',
        color = 'var(--color-primary)',
        n = 0,
    }: {
        items: Item[];
        title?: string;
        note?: string;
        color?: string;
        n?: number;
    } = $props();

    let width = $state(0);

    const barHeight = 24;
    const gap = 8;
    const labelWidth = 150;
    const percentageWidth = 50;
    const margin = {top: 4, right: 8, bottom: 4, left: 4};

    const innerWidth = $derived(Math.max(width - labelWidth - percentageWidth - margin.left - margin.right, 0));
    const svgHeight = $derived(items.length * (barHeight + gap) + margin.top + margin.bottom);

    const xScale = $derived(scaleLinear().domain([0, 100]).range([0, innerWidth]).clamp(true));

</script>

<div class="barchart" bind:clientWidth={width}>
    {#if title}
        <p class="bar-title">{title}</p>
    <svg width={width} height={svgHeight} aria-label={title}>
            <g transform="translate({margin.left}, ${margin.top })">
            {#each items as item, i }
             {@const y = i * (barHeight + gap)}
             {@const barW = xScale(item.percent)}

             <!-- label -->
              <foreignObject x = {0} y={y} width={labelWidth - 10} height={barHeight + gap}>
                <div class="bar-label">{item.label}</div>
                </foreignObject>
                <!-- bar -->
                <rect x={labelWidth} y={y+5} width={innerWidth} height={barHeight-10} fill={color} rx="3"/> // define color style sheet 

                <!-- bar filling -->
                <rect x={labelWidth} y={y+5} width={innerWidth} height={barHeight-10} fill={color} rx="3" opacity="0.8"/>

                <!-- percentage label -->
                 <text x={labelWidth + innerWidth + 5} y={y + barHeight / 2 +1} dominant-baseline="middle" class="bar-percentage">{item.percent}%</text>
            {/each}
        </g>
    </svg>
    {/if}

    {#if note || n}
        <p class="bar-note">
            {#if n} n = {n} {note ? '.' : ''}{/if}{note}
        </p>
    {/if}
</div>

// add styles for the bar chart here for now put later to a style sheet
<style>
    .barchart {
        width: 100%;
        font-family: sans-serif;
        font-size: 9rem;
    }

    .bar-title {
        font-weight: 600;
        margin-bottom: 0.5em;
    }

    .bar-label {
        font-size: 0.9em;
        line-height: 1.2em;
        display: flex;
        align-items: center;
        padding-right: 0.5rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        color: var(--color-gray);
    }

    .bar-percentage {
        font-size: 0.8em;
        fill: var(--color-gray);
    }

    .bar-note {
        font-size: 0.8em;
        margin-top: 0.5em;
        color: var(--color-gray);
    }

</style>

                

