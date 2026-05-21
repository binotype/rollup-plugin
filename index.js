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
      let serialized;
      try {
        serialized = JSON.stringify(parsed);
      } catch (error) {
        throw new TypeError(`Parser result for "${id}" is not JSON-serializable.`);
      }

      return {
        code: `export default ${serialized};`
      };
    }
  };
}

module.exports = rollupPlugin;
