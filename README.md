# vite-plugin-raw-ts

vite-plugin-raw-ts will transform any type file to string

# Install

```bash
npm install -D vite-plugin-raw-ts
```

# Usage

```js
import vitePluginRaw from "vite-plugin-raw-ts";
const path = require("path");

module.exports = {
    plugins: [
        vitePluginRaw({
            match: /\.svg$/,
            exclude: [new RegExp(path.resolve(__dirname, "./src/assets"))],
        }),
    ],
};
```

or

```js
import richtextRedo from "../assets/richtext_redo.svg?raw";
```
