<script lang="ts">
    import Section from "$story/Story.Section.svelte";
    import StatBlock from "$story/Story.StatBlock.svelte";
    import ChartBlock from "$story/Story.ChartBlock.svelte";
    import PersonaCard from "$story/Story.PersonaCard.svelte";
    import BarChart from "$components/figure/Figure.BarChart.svelte";
    import charts from "$data/charts.json";

    import {PERSONAS} from "$data/personas";

    const nam = PERSONAS.find(persona => persona.id === 'nam')!
    const f2A1 = charts.wahrnehmung.items.find(item => item.code === 'F2A1')?.percent ?? 0;
    const f2A2 = charts.wahrnehmung.items.find(item => item.code === 'F2A2')?.percent ?? 0;

</script>

<!-- add structure for first persona setup -->

<Section accent="#2DD4BF" eyebrow="01 · WISSEN" next="/story/vertrauen">
    <h2>Was wissen Bürger:innen über Sensoren?</h2>
      <p class="intro">Bevor wir über Meinungen sprechen: Wie viel wissen die Befragten überhaupt über Sensoren in ihrer Stadt?</p>

      <hr />

    <PersonaCard persona={nam} compact />

    <StatBlock
        stat="{f2A1} %"
        text="der Befragten nehmen Sensoren im Alltag wahr, aber nur {f2A2} % können sie korrekt benennen." 
        source = "Quelle: ÖFIT 2021"/>

    <p class="body-text">
        Kameras sind der bekannteste Sensortyp. Weniger bekannt sind Umwelt- und Prozesssensoren, obwohl diese in vielen Kommunen bereits flächendeckend eingesetzt werden.
    </p>

    <!-- oder title = {charts.sensortyp.title} -->
    <ChartBlock title="Bekanntheitsgrad nach Sensortyp (f3)" code="f3">
        <BarChart items={charts.sensortypen.items} note = {charts.sensortypen.note} />
    </ChartBlock>

    <ChartBlock title="Wahrnehmung von Sensoren (f2)" code="f2">
        <BarChart items={charts.wahrnehmung.items} note = {charts.wahrnehmung.note} />
    </ChartBlock>

    <ChartBlock title="Wissen über Funktionsweise (f4)" code="f4">
        <BarChart title = {charts.wissensensoren.title} items={charts.wissensensoren.items} note = {charts.wissensensoren.note} color="var(--story-accent-wissen)" />
    </ChartBlock>
</Section>

<style>
    h2 {
        font-size: clamp(1.5rem, 2vw, 2rem);
        font-weight: 700;
        line-height: 1.2;
        color: var(--story-on-bg);
        margin-bottom: 1rem;
    }
    .intro {
        font-size: 1rem;
        color: color-mix(in srgb, var(--color-gray-300) 50%, transparent);
        line-height: 1.5;
        margin-bottom: 1rem;
    }
    hr{
        border: none;
        border-top: 1px solid color-mix(in srgb, var(--story-on-bg) 20%, transparent);
        margin: 1rem 0;
    }
    .body-text {
        font-size: 1rem;
        color: color-mix(in srgb, var(--story-on-bg) 70%, transparent);
        line-height: 1.5;
        margin-bottom: 1rem;
    }
</style>