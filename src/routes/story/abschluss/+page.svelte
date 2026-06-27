<script lang="ts">
    import Section from '$story/Story.Section.svelte'
    import charts from '$data/charts.json'

    const f2A1 = charts.wahrnehmung.items.find(item => item.label === 'F2A1')?.percent ?? 0;
    const percentPublic = (charts.vertrauenbetreiber.items.find(item => item.label === '1')?.percent ?? 0) + (charts.vertrauenbetreiber.items.find(item => item.label === '2')?.percent ?? 0);
    const percentSicherheit = charts.kamerabedeutung.items.find(item => item.answer === '1')?.percent ?? 0;
</script>

