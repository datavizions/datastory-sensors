<script lang="ts">
  import Section from '$story/Story.Section.svelte'
  import ChartBlock from '$story/Story.ChartBlock.svelte'
  import PersonaCard from '$story/Story.PersonaCard.svelte'
  import BarChart from "$components/figure/Figure.BarChart.svelte"
  import Donut from "$components/figure/Figure.Donut.svelte"
  import { PERSONAS } from '$data/personas.js'
  import { storyFilter } from '$runes/storyFilter.svelte.js'

  let charts = $derived(storyFilter.charts)
  let n = $derived(storyFilter.n)
  let activeId = $derived(storyFilter.selectedPersonaId)

  const activePersona = $derived(PERSONAS.find(p => p.id === activeId) ?? PERSONAS[0])
</script>

<Section accent="var(--story-accent-perspektive)" eyebrow="EXPLORATION" next="/story/perspektive">
  <h2>Personas erkunden</h2>
  <p class="intro">
    Wähle eine Persona und entdecke, wie unterschiedliche Gruppen
    Sensoren wahrnehmen.
  </p>

  <!-- persona grid -->
  <div class="persona-grid">
    {#each PERSONAS as p}
      <PersonaCard
        persona={p}
        selected={activeId === p.id}
        onclick={() => storyFilter.selectPersona(p.id, p.filters)}
      />
    {/each}
  </div>

  {#if activePersona}
    <div class="quote-block" style="border-color:{activePersona.color}">
      <p class="quote-text">{activePersona.summary}</p>
      <p class="quote-sub">{activePersona.subline}</p>
    </div>
  {/if}

  <div class="filter-info">
    <span class="filter-label">FILTER</span>
    {#if activePersona && activeId}
      {#each Object.entries(activePersona.filters) as [k, v]}
        <span class="filter-tag">{k}: {v}</span>
      {/each}
    {:else}
      <span class="filter-tag filter-tag--all">alle Befragten</span>
    {/if}
    <span class="filter-n">
      n = {n}
      {#if n < 10}<span class="filter-n__warn"> · Kleiner Sample</span>{/if}
    </span>
  </div>

  <p class="results-label">ERGEBNISSE FÜR {activePersona?.name?.toUpperCase() ?? 'ALLE'}</p>

  <ChartBlock title="Einstellung zu Sensoren allgemein (f1)" code="f1">
    <BarChart items={charts.einstellung_tech.items} color={activePersona?.color ?? 'var(--story-accent-perspektive)'} />
  </ChartBlock>

  <ChartBlock title="Überwachungsgefühl (f6A3)" code="f6A3">
    <Donut items={charts.befindlichkeit.items.find(i => i.code === 'f6A3_1')?.distribution ?? []}
           colors={[
             activePersona?.color ?? 'var(--story-accent-perspektive)',
             'var(--story-accent-persona-2)',
             'var(--story-accent-perspektive-4)',
             'var(--story-accent-perspektive-5)'
           ]}
           size={160} />
  </ChartBlock>

  <ChartBlock title="Vertrauen in Betreiber (f11b)" code="f11b">
    <BarChart items={charts.vertrauen_betreiber.items} color={activePersona?.color ?? 'var(--story-accent-perspektive)'} />
  </ChartBlock>

  <ChartBlock title="Zustimmung Videoüberwachung nach Ort (f20)" code="f20">
    <BarChart
      items={charts.kamera_zustimmung_orte.items.map(item => ({
        label: item.label,
        percent: item.distribution.find(d => d.answer === '1')?.percent ?? 0,
        count: item.distribution.find(d => d.answer === '1')?.count ?? 0,
      }))}
      note="Anteil stimme uneingeschränkt zu"
      color={activePersona?.color ?? 'var(--story-accent-perspektive)'}
    />
  </ChartBlock>
</Section>

<style>
  h2 {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
    font-weight: 900;
    line-height: 1.15;
    margin: 0 0 0.75rem;
  }

  .intro {
    font-size: 0.9375rem;
    color: color-mix(in srgb, var(--story-on-bg) 65%, transparent);
    line-height: 1.6;
    margin-bottom: 1.25rem;
  }

  .persona-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
    margin-bottom: 1rem;
  }

  .quote-block {
    border-left: 3px solid;
    padding: 0.75rem 1rem;
    background: var(--story-surface);
    border-radius: 0 0.5rem 0.5rem 0;
    margin-bottom: 1rem;
  }

  .quote-text {
    font-size: 1rem;
    font-weight: 600;
    color: var(--story-on-bg);
    margin: 0 0 0.25rem;
    line-height: 1.4;
  }

  .quote-sub {
    font-size: 0.8125rem;
    color: color-mix(in srgb, var(--story-on-bg) 45%, transparent);
    margin: 0;
  }

  .filter-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .filter-label {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: color-mix(in srgb, var(--story-on-bg) 35%, transparent);
  }

  .filter-tag {
    font-size: 0.75rem;
    background: var(--story-surface);
    color: var(--story-accent-perspektive);
    border: 1px solid color-mix(in srgb, var(--story-accent-perspektive) 30%, transparent);
    border-radius: 0.25rem;
    padding: 0.1rem 0.4rem;
  }

  .filter-tag--all {
    color: color-mix(in srgb, var(--story-on-bg) 50%, transparent);
    border-color: color-mix(in srgb, var(--story-on-bg) 15%, transparent);
  }

  .filter-n__warn {
    color: var(--story-accent-perspektive);
    font-style: italic;
  }

  .results-label {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: color-mix(in srgb, var(--story-on-bg) 35%, transparent);
    margin: 0 0 0.75rem;
  }
</style>