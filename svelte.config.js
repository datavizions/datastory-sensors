import adapterStatic from "@sveltejs/adapter-static";
import { sveltePreprocess } from "svelte-preprocess";
import autoprefixer from "autoprefixer";

const preprocess = sveltePreprocess({
	postcss: {
		plugins: [autoprefixer]
	}
});

const config = {
	compilerOptions: {
		runes: true
	},
	preprocess,
	kit: {
		adapter: adapterStatic({ strict: false }),
		alias: {
			$components: "src/components",
			$styles: "src/styles",
			$story: "src/story",
			$utils: "src/utils",
			$data: "src/data"
		}
	}
};

export default config;
