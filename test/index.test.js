const test = require('node:test');
const assert = require('node:assert/strict');

const rollupPlugin = require('../index.js');

test('transforms matching files by parsing their text content', () => {
  const parserCalls = [];
  const parser = (text, id) => {
    parserCalls.push({ text, id });
    return { html: `<p>${text}</p>` };
  };
  const plugin = rollupPlugin(parser);

  const result = plugin.transform('hello', '/content/page.typeup');

  assert.deepEqual(parserCalls, [{ text: 'hello', id: '/content/page.typeup' }]);
  assert.equal(result.code, 'export default {"html":"<p>hello</p>"};');
});

test('does not transform files with non-matching extensions', () => {
  const parser = () => ({});
  const plugin = rollupPlugin(parser);

  const result = plugin.transform('hello', '/content/page.txt');

  assert.equal(result, null);
});

test('allows overriding matched extensions', () => {
  const parser = (text) => ({ text });
  const plugin = rollupPlugin(parser, { extensions: ['.txt'] });

  const result = plugin.transform('hello', '/content/page.txt');

  assert.equal(result.code, 'export default {"text":"hello"};');
});
