<script lang="ts">
    import Section from "$components/story/Story.Section.svelte";
    import StatBlock from "$components/story/Story.StatBlock.svelte";
    import ChartBlock from "$components/story/Story.ChartBlock.svelte";
    import PersonaCard from "$components/story/Story.PersonaCard.svelte";
    import BarChart from "$components/figure/Figure.BarChart.svelte";
    import charts from "$data/charts.json";

    import { PERSONAS } from "$data/personas.json";
</script>

<!-- add structure for first persona setup-->