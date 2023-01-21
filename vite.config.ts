import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import UnoCSS from '@unocss/vite';

const config: UserConfig = {
	plugins: [sveltekit(), UnoCSS()]
};

export default config;
