const fs = require('fs');

// Define the function and export it
function vitePluginRaw({ match, exclude }) {
  return {
    name: 'vite-plugin-raw',
    async transform(_, id) {
      // Handle both single and array of RegExps for match
      const files = Array.isArray(match) ? match : [match];
      // Handle both single and array of RegExps for exclude, with fallback to empty array
      const excludes = exclude ? (Array.isArray(exclude) ? exclude : [exclude]) : [];
      // Determine if the file should be excluded
      const excludeBool = excludes.length === 0 || !excludes.some(v => v.test(id));

      // Check if the file ID ends with '?raw', indicating raw import
      const isRaw = id.endsWith("?raw");
      
      // Process the file if it matches and isn't excluded, or is a raw import
      if ((files.some(v => v.test(id)) && excludeBool) || isRaw) {
        if (isRaw) {
          id = id.replace("?raw", ""); // Adjust the file identifier if it's a raw import
        }
        // Read the file synchronously
        const buf = fs.readFileSync(id, 'utf8'); // Ensure text is read, not binary
        return {
          code: `export default \`${buf}\``
        };
      } else {
        // Return an empty object if no conditions are met
        return {};
      }
    }
  };
}

module.exports = vitePluginRaw;
