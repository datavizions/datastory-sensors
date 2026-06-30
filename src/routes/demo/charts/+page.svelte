// setup for simple svelte demo page for charts

// import chart types as componentes
<script>
	import chartsSample from "$data/charts.sample.json";
	import chartsFull from "$data/charts.full.json";
	import BarChart from "$components/figure/Figure.BarChart.svelte";
	import Donut from "$components/figure/Figure.Donut.svelte";
	import Stat from "$components/figure/Figure.Stat.svelte";

	let dataset = $state('sample');
	let charts = $derived(dataset === 'full' ? chartsFull : chartsSample);
</script>

<div class="page">
	<h1>Sensoren im öffentlichen Raum: Visualisierungen zur Übersicht</h1>

	<div class="dataset-switch" role="group" aria-label="Datensatz auswählen">
		<button class:active={dataset === 'sample'} onclick={() => (dataset = 'sample')}>sample</button>
		<button class:active={dataset === 'full'} onclick={() => (dataset = 'full')}>full</button>
	</div>
	
	<section>
		<h2>Statistik</h2>
		<div class="stats">
			<Stat {...charts.überwachungsgefühl} color="var(--red)" />
			<Stat {...charts.infobedürfnis} color="var(--blue)" />
			<Stat {...charts.kamerabedenken} color="var(--green)" />
			<Stat {...charts.verhaltensanpassung} color="var(--yellow)" />
		</div>
	</section>

	<section>
		<h2>Wissen</h2>
		<div class="chart-row">
			<BarChart title = {charts.wahrnehmung.title} items={charts.wahrnehmung.items} note = {charts.wahrnehmung.note} n={charts.wahrnehmung.n} />
		</div>

		<div class="charts">
			<BarChart title = {charts.sensortypen.title} items={charts.sensortypen.items} note = {charts.sensortypen.note} n={charts.sensortypen.n} color = "var(--blue)" />
		</div>
		<div class="charts">
			<BarChart title = {charts.wissensensoren.title} items={charts.wissensensoren.items} note = {charts.wissensensoren.note} n={charts.wissensensoren.n} color = "var(--blue)" />
		</div>
	</section>
	<section>
		<h2>Befindlichkeit</h2>
		<div class="chart-row">
		<div class="charts">
			<Donut title = {charts.einstellungtechnik.title} items={charts.einstellungtechnik.items}  />
		</div>
		<div class="charts">
			<BarChart title = {charts.akzeptanzmaßnahmen.title} items={charts.akzeptanzmaßnahmen.items.map(item => ({ label: item.label, percent: item.distribution.find(d => d.answer === '1')?.percent ?? 0, count: item.distribution.find(d => d.answer === '1')?.count ?? 0 }))} n={charts.akzeptanzmaßnahmen.n} note = "Anteil: Erhöht Zustimmung" color = "var(--green)" />
		</div>
		</div>
	</section>


	<section>
		<h2>Vertrauen</h2>
		<div class="chart-row">
		<div class="charts">
			<Donut title = {charts.vertrauenbetreiber.title} items={charts.vertrauenbetreiber.items}  />
		</div>
		<div class="charts">
			<BarChart title = {charts.datenschutzhaltung.title} items={charts.datenschutzhaltung.items} note = {charts.datenschutzhaltung.note} n={charts.datenschutzhaltung.n} color = "var(--orange)" />
		</div>
		</div>
	</section>

	<section>
		<h2>Fokus Kamera</h2>
		<div class="chart-row">
		<div class="charts">
			<Donut title = {charts.kamerabedeutung.title} items={charts.kamerabedeutung.items}  />
		</div>
		<div class="charts">
			<BarChart title = {charts.kamerazustimmungort.title} items={charts.kamerazustimmungort.items} note = {charts.kamerazustimmungort.note} n={charts.kamerazustimmungort.n} color = "var(--purple)" />
		</div>
		</div>
	</section>


</div>



<style>
	.page {
		max-width: 100%;
		padding: 2rem 1.5rem 4rem;
		margin: 0 auto;
	}

	h1 {
		font-size: 1.5em;
		font-weight: 600;
		font-family: var(--font-sans);
		margin-bottom: 2rem;
	}

	h2 {
		font-size: 1rem;
		font-weight: 600;
		font-family: var(--font-sans);
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-gray);
		border-bottom: 2px solid var(--color-gray);
		padding-bottom: 0.5rem;
	}

	section {
		margin-bottom: 3rem;
		font-family: var(--font-sans);

	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 0.2rem;
		font-family: var(--font-sans);

	}

	.charts {
		min-width: 0;
		font-family: var(--font-sans);

	}

	.chart-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
		font-family: var(--font-sans);

	}

	@media (max-width: 480px) {
		.chart-row {
			grid-template-columns: 1fr;
		}
	}

	.dataset-switch {
		display: inline-flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.dataset-switch button {
		border: 1px solid var(--color-gray-300, #ccc);
		background: transparent;
		padding: 0.4rem 0.7rem;
		border-radius: 0.4rem;
		cursor: pointer;
		font-size: 0.85rem;
	}

	.dataset-switch button.active {
		background: var(--color-gray-200, #eee);
		font-weight: 600;
	}
</style>