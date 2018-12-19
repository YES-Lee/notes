const esprima = require('esprima');

const code = `
  function add (a, b) {
    return a + b;
  }
  const answer = add(1, 2);
`;

const comModule = esprima.parseModule(code);
const comScript = esprima.parseScript(code);

delete comModule.sourceType
delete comScript.sourceType

console.log(JSON.stringify(comModule) === JSON.stringify(comScript));