import { Plugin } from 'vite';

export interface Props {
	/**
	 * Regex to match file, like /\.svg$/
	 */
	match: RegExp | RegExp[];

	/**
	 * Optional regex or array of regexes to exclude certain files
	 */
	exclude?: RegExp | RegExp[];
}

export interface ReturnValue {
	/**
	 * Optional string of code to be returned as the module content
	 */
	code?: string;
}

declare const viteRawPlugin: (props: Props) => Plugin;

export default viteRawPlugin;