<script>
	import "$styles/app.css";

	let { children } = $props();
</script>

<div class="story-root">
	{@render children?.()}
</div>

<style>
 :global(#content) {
		padding: 0 !important;
		margin: 0;
	}

	.story-root {
		background: #0d1b2a;
	}
</style>