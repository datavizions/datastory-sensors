<script lang="ts">
	import Section from "$story/Story.Section.svelte";
</script>

<Section accent="var(--story-accent-perspektive)" eyebrow="05 · PERSÖNLICHE FILTER">
	<h2>Persönliche Filter</h2>
	<p class="intro">
		Wähle im nächsten Schritt Deine eigenen Merkmale aus, zum Beispiel Geschlecht (s1),
		Alter (s2neu) und bei Bedarf Tätigkeit (s6), und vergleiche,
		wie sich Wahrnehmung, Vertrauen und Zustimmung je nach Gruppe verändern.
	</p>
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
</style>