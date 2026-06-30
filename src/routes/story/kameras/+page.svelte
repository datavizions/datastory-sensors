<script lang="ts">
    import Section from "$story/Story.Section.svelte";
    import StatBlock from "$story/Story.StatBlock.svelte";
    import ChartBlock from "$story/Story.ChartBlock.svelte";
    import PersonaCard from "$story/Story.PersonaCard.svelte";
    import BarChart from "$components/figure/Figure.BarChart.svelte";
    import Donut from "$components/figure/Figure.Donut.svelte";
    import charts from "$data/charts.json";

    import {PERSONAS} from "$data/personas";
	import { percentage } from "../../../scripts/charts";

    const barbara = PERSONAS.find(persona => persona.id === 'barbara')!
    const percentageSafety = charts.kamerabedeutung.items.find(item => item.answer === '1')?.percent ?? 0;
    const percentageBedenken = charts.kamerabedenken.percent

</script>

<!-- add structure for first persona setup -->

<Section accent="#9B7FD4" eyebrow="02 · FOKUS KAMERAS" next="/story/personas">
    <h2>Sicherheit oder Überwachung?</h2>
      <p class="intro">
        Kameras sind die bekanntesten und umstrittensten Sensoren. 
        Was denken Bürger:innen wirklich?
      </p>

      <hr />

    <PersonaCard persona={barbara} compact />

    <div class="stat-row">
        <div class="stat-mini">
            <div class="stat-mini-number" style="color: var(--red)">{percentageSafety}%</div>
            <div class="stat-mini-label">nehmen Sensoren im Alltag wahr</div>
        </div>
        <div class="stat-mini">
            <div class="stat-mini-number" style="color: var(--red)">{percentageBedenken}%</div>
            <div class="stat-mini-label">finden automatische KI-Ortsverfolgung bedenklich</div>
        </div>
    </div>

    <!-- oder title = {charts.sensortyp.title} -->
    <ChartBlock title="Videoüberwachung: Sicherheit oder Eingriff? (f18)" code="f18">
        <Donut items={charts.kamerabedeutung.items} colors={['#9B7FD4', '#7a5fb5', '#5e4490', '#432e6b', '#2c1d48']} />
    </ChartBlock>

    <ChartBlock title="Zustimmung nach Ort (f20)" code="f20">
        <BarChart items={charts.kamerazustimmungort.items} n={charts.kamerazustimmungort.n} />
    </ChartBlock>

    <ChartBlock title="Verhaltensanpassung((f19A3/f23A4)" code="f19/f23">
    </ChartBlock>
</Section>

<style>
    h2 {
        font-size: clamp(1.5rem, 2vw, 2rem);
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 1rem;
    }
    .intro {
        font-size: 1rem;
        color: color-mix(in srgb, var(--story-on-bg) 50%, transparent);
        line-height: 1.5;
        margin-bottom: 1rem;
    }
    hr{
        border: none;
        border-top: 1px solid color-mix(in srgb, var(--story-on-bg) 20%, transparent);
        margin: 1rem 0;
    }
    .stat-row {
        display: grid;
        gap: 0.8rem;
        margin-bottom: 1rem;
    }
    .stat-mini {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        background-color: var(--story-surface);
        border-radius: 0.5rem;
    }
    .stat-mini-number {
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
        color: var(--story-accent-kameras);
    }
    .stat-mini-text {
        font-size: 0.9rem;
        color: var(--story-on-bg);
    }
   
</style>