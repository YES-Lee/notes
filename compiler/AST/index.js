const esprima = require('esprima');

const scriptCode = `const foo = 'hello'`;
const moduleCode = `import esprima from 'esprima'`;

const scriptAst = esprima.parseScript(scriptCode);

const moduleAst = esprima.parseModule(moduleCode);

// console.log(scriptAst);
// console.log(moduleAst);
