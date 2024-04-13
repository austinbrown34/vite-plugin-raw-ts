import { Plugin } from 'vite';

// Node's file system module, using ESM syntax for import
import fs from 'fs';

interface Props {
	/**
	 * Regex to match file, like /\.svg$/
	 */
	match: RegExp | RegExp[];

	/**
	 * Optional regex or array of regexes to exclude certain files
	 */
	exclude?: RegExp | RegExp[];
}

interface ReturnValue {
	/**
	 * Optional string of code to be returned as the module content
	 */
	code?: string;
}

// Export the function as a default export with its explicit type
export default function ({ match, exclude }: Props): Plugin {
	return {
		name: 'vite-plugin-raw',
		async transform(_: string, id: string): Promise<ReturnValue> {
			// Convert match and exclude into arrays if they aren't already
			const files = Array.isArray(match) ? match : [match];
			const excludes = exclude ? (Array.isArray(exclude) ? exclude : [exclude]) : [];

			// Determine if the file should be excluded
			const excludeBool = excludes.length === 0 || !excludes.some(v => v.test(id));

			// Check if the file ID ends with '?raw', indicating raw import
			const isRaw = id.endsWith("?raw");

			// Apply the transformation if the file matches and is not excluded, or is explicitly a raw import
			if ((files.some(v => v.test(id)) && excludeBool) || isRaw) {
				if (isRaw) {
					id = id.slice(0, -4); // Remove '?raw' from the ID
				}
				// Read the file synchronously and return its contents wrapped in a default export template literal
				const buf = fs.readFileSync(id, 'utf8');
				return {
					code: `export default \`${buf}\``
				};
			} else {
				// Return an empty object if conditions are not met
				return {};
			}
		}
	};
}
