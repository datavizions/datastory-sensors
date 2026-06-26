<!--define what bars should show-->
<!-- setup + vertical setup-->

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
    const labelHeight = 40;
    const percentageWidth = 50;
    const margin = {top: 4, right: 8, bottom: 4, left: 4};
    const rowHeight = barHeight + labelHeight +gap;

    const innerWidth = $derived(Math.max(width - percentageWidth - margin.left - margin.right, 0));
    const svgHeight = $derived(items.length * rowHeight + margin.top + margin.bottom);

    const xScale = $derived(scaleLinear().domain([0, 100]).range([0, innerWidth]).clamp(true));

    const sorted = $derived([...items].sort((a, b) => b.percent - a.percent));

</script>

<div class="barchart" bind:clientWidth={width}>
    {#if title}
        <p class="bar-title">{title}</p>
    <svg width={width} height={svgHeight} aria-label={title}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
            {#each sorted as item, i }
             {@const y = i * rowHeight}
             {@const barW = xScale(item.percent)}

             <!-- label -->
                <!-- bar -->
                <rect x={0} y={y} width={innerWidth} height={barHeight-10} fill="var(--color-gray-100, #EEEEEE)" rx="3"/>

                <!-- bar filling -->
                <rect x={0} y={y} width={barW} height={barHeight-10} fill={color} rx="3"/>

                <!-- percentage label -->
                 <text x={innerWidth + 5} y={y + barHeight / 2 +1} dominant-baseline="middle" class="bar-percentage">{item.percent}%</text>

                 <!-- label below -->
                <text x={0} y={y + barHeight + 12} dominant-baseline="hanging" class="bar-percentage"></text>

                <foreignObject x="0" y={y} width={innerWidth} height={labelHeight}>
                <div class="bar-label">{item.label}</div>
                </foreignObject>
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

<!--add styles for the bar chart here for now put later to a style sheet-->
<style>
    .barchart {
        width: 100%;
        font-family: sans-serif;
        font-size: 0.9rem;
    }

    .bar-title {
        font-weight: 600;
        margin-bottom: 0.5em;
    }

    .bar-label {
        font-size: 0.8em;
        line-height: 1.2em;
        padding-top: 1.5em;
        display: flex;
        align-items: flex-start;
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

                

