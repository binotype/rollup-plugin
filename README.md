# rollup-plugin
Rollup plugin to import TypeUp files and parse them into a Binotype site.

## Usage

```js
const typeup = require('rollup-plugin');
const parse = require('@binotype/typeup-parser');

module.exports = {
  plugins: [typeup(parse)]
};
```
