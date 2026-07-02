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

    const barHeight = 20;
    const gap = 6;
    const labelHeight = 38;
    const percentageWidth = 50;
    const margin = {top: 2, right: 8, bottom: 2, left: 2};
    const rowHeight = barHeight + labelHeight + gap;

    const innerWidth = $derived(Math.max(width - percentageWidth - margin.left - margin.right, 0));
    const visibleItems = $derived(items.filter((item) => item.percent > 0));
    const svgHeight = $derived(visibleItems.length * rowHeight + margin.top + margin.bottom);

    const xScale = $derived(scaleLinear().domain([0, 100]).range([0, innerWidth]).clamp(true));

    const sorted = $derived(
        [...visibleItems]
            .sort((a, b) => b.percent - a.percent)
    );

    function cleanLabel(label: string): string {
        return String(label)
            .replace(/^[-–—]\s*/, '')
            .replace(/^\t+/, '')
            .trim();
    }

</script>

<div class="barchart" bind:clientWidth={width}>
    {#if title}
        <p class="bar-title">{title}</p>
    {/if}
    <svg width={width} height={svgHeight} aria-label={title}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
            {#each sorted as item, i }
             {@const y = i * rowHeight}
             {@const barW = xScale(item.percent)}
                 {@const tone = Math.max(40, 76 - i * 8)}

             <!-- label -->
                <!-- bar -->
                     <rect x={0} y={y} width={innerWidth} height={barHeight} fill="color-mix(in srgb, var(--story-on-bg) 12%, transparent)" rx="5"/>

                <!-- bar filling -->
                     <rect x={0} y={y} width={barW} height={barHeight} fill={`color-mix(in srgb, ${color} ${tone}%, transparent)`} rx="5"/>

                <!-- percentage label -->
                      <text x={innerWidth + 6} y={y + barHeight / 2 + 1} dominant-baseline="middle" class="bar-percentage">{item.percent}%</text>

                <foreignObject x="0" y={y + barHeight + 5} width={innerWidth} height={labelHeight}>
                <div class="bar-label">{cleanLabel(item.label)}</div>
                </foreignObject>
            {/each}
        </g>
    </svg>

    {#if note || n}
        <p class="bar-note">
            {#if n}n = {n} Anzahl der Befragten{note ? ' · ' : ''}{/if}{note}
        </p>
    {/if}
</div>

<!--add styles for the bar chart here for now put later to a style sheet-->
<style>
    .barchart {
        width: 100%;
        font-family: var(--font-sans);
        font-size: 0.9rem;
    }

    .bar-title {
        font-family: var(--font-mono);
        font-size: 0.82rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: color-mix(in srgb, var(--story-on-bg) 60%, transparent);
    }

    .bar-label {
        font-size: 0.76rem;
        line-height: 1.14;
        padding-top: 0;
        padding-right: 0.7rem;
        overflow: visible;
        white-space: normal;
        word-break: break-word;
        color: color-mix(in srgb, var(--story-on-bg) 65%, transparent);
    }

    .bar-percentage {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        fill: color-mix(in srgb, var(--story-on-bg) 60%, transparent);
    }

    .bar-note {
        font-family: var(--font-mono);
        font-size: 0.78rem;
        margin-top: 0.75rem;
        color: color-mix(in srgb, var(--story-on-bg) 35%, transparent);
        text-align: center;
    }

</style>

                

