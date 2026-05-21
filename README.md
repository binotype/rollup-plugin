# rollup-plugin
Rollup plugin to import TypeUp files and parse them into a Binotype site.

## Usage

```js
const rollupPlugin = require('rollup-plugin');
const parse = require('@binotype/typeup-parser');

module.exports = {
  plugins: [rollupPlugin(parse)]
};
```
