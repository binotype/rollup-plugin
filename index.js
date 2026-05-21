'use strict';

function rollupPlugin(parser, options = {}) {
  if (typeof parser !== 'function') {
    throw new TypeError('Expected parser to be a function.');
  }

  const extensions = options.extensions || ['.typeup'];

  return {
    name: 'text-parser',
    transform(source, id) {
      if (!extensions.some((extension) => id.endsWith(extension))) {
        return null;
      }

      const parsed = parser(source, id);
      return {
        code: `export default ${JSON.stringify(parsed)};`
      };
    }
  };
}

module.exports = rollupPlugin;
