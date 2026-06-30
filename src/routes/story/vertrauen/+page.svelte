<script lang="ts">
  import Section from '$story/Story.Section.svelte'
  import StatBlock from '$story/Story.StatBlock.svelte'
  import ChartBlock from '$story/Story.ChartBlock.svelte'
  import PersonaCard from '$story/Story.PersonaCard.svelte'
  import Donut from '$components/figure/Figure.Donut.svelte'
  import BarChart from "$components/figure/Figure.BarChart.svelte"
  import { PERSONAS } from '$data/personas.js'
  import charts from '$data/charts.json'

  const emre = PERSONAS.find(p => p.id === 'emre')!

  const vertrauen = charts.vertrauenbetreiber
  const percentPublic = (vertrauen.items.find(i => i.answer === '3')?.percent ?? 0)
                  + (vertrauen.items.find(i => i.answer === '4')?.percent ?? 0)
</script>

<Section accent="var(--story-accent-vertrauen)" eyebrow="02 · VERTRAUEN" next="/story/kameras">
  <h2>Wem vertrauen Bürger:innen?</h2>
  <p class="intro">
    Öffentliche oder private Betreiber: macht das einen Unterschied?
    Und unter welchen Bedingungen stimmen Menschen einer Datennutzung zu?
  </p>

  <hr />

  <PersonaCard persona={emre} compact />

  <StatBlock
    stat="{percentPublic} %"
    text="der Befragten vertrauen eher öffentlichen Betreibern bei der datenschutzkonformen Verarbeitung."
    source="Quelle: ÖFIT 2023, f11b"
  />

  <ChartBlock title="Vertrauen: öffentlich vs. privat (f11/f11b)" code="f11b">
    <Donut items={charts.vertrauenbetreiber.items} note={charts.vertrauenbetreiber.note}
           colors={[
             'var(--story-accent-vertrauen)',
             'var(--story-accent-vertrauen-2)',
             'var(--story-accent-vertrauen-3)',
             'var(--story-accent-vertrauen-4)',
             'var(--story-accent-vertrauen-5)'
           ]} />
  </ChartBlock>

  <ChartBlock title="Haltung zu Datenschutz und Datennutzung (f10)" code="f10">
    <BarChart items={charts.datenschutzhaltung.items} note={charts.datenschutzhaltung.note}
      n={charts.datenschutzhaltung.n}
      color="var(--story-accent-vertrauen)" />
  </ChartBlock>

  <ChartBlock title="Maßnahmen und Akzeptanz (f8)" code="f8">
    <BarChart
      items={charts.akzeptanzmaßnahmen.items.map(item => ({
        label: item.label,
        percent: item.distribution.find(d => d.answer === '1')?.percent ?? 0,
        count: item.distribution.find(d => d.answer === '1')?.count ?? 0
      }))}
      n={charts.akzeptanzmaßnahmen.n}
      note="Anteil: Erhöht Zustimmung"
      color="var(--story-accent-vertrauen)"
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

  hr {
    border: none;
    border-top: 1px solid color-mix(in srgb, var(--story-on-bg) 10%, transparent);
    margin: 1.25rem 0;
  }
</style>