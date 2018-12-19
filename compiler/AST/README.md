2018-12-11

# 抽象语法树

> 抽象语法树（abstract syntax tree或者缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。和抽象语法树相对的是具体语法树（concrete syntaxtree），通常称作分析树（parse tree）。一般的，在源代码的翻译和编译过程中，语法分析器创建出分析树。一旦AST被创建出来，在后续的处理过程中，比如语义分析阶段，会添加一些信息。

## 结构

> 抽象语法树的结构不依赖于源语言的文法，也就是语法分析阶段所采用的上下文无关文法。因为在Parser过程中，经常会对文法进行等价的转换（消除左递归、回溯、二义性等），这样会给文法引入一些多余的成分，对后续阶段造成不利影响，甚至会使各阶段变得混乱。因此，很多编译器（包括GJC）经常要独立地构造语法分析树，为前、后端建立一个清晰的接口。

下图是hello.java中的“hello world“程序的AST示例:

![](https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=3f7bee79afc3793169658e7b8aaddc20/3b87e950352ac65c57b34a0cfbf2b21193138a1e.jpg)

## javascript——AST

在以前的JavaScript开发过程中，无论是业务逻辑还是页面效果，用到抽象语法树的地方都非常少甚至基本用不上。但是在如今前端工程化的趋势下，AST在各大前端框架（`vue`, `react`, `angular`）、打包工具（`webpack`, `babel`, `eslint`）等方面都会依赖于AST，对源代码进行修改、优化。

### 结构

下面列出部分接口声明，帮助理解，具体内容查看参考链接。
> 参考[https://esprima.readthedocs.io/en/latest/syntax-tree-format.html](https://esprima.readthedocs.io/en/latest/syntax-tree-format.html)

* 节点对象
  ```typescript
  interface Node {
    type: string; // AST变体类型
    loc: SourceLocation | null; // 源码位置信息
  }
  ```
  ```typescript
  interface SourceLocation {
    source: string | null;
    start: Position; // 源码开始位置
    end: Position; // 源码结束位置
  }
  ```
  ```typescript
  interface Position {
    line: uint32 >= 1;
    column: uint32 >= 0;
  }
  ```
* Programs
  ```typescript
  // 一个完整的program source tree
  interface Program <: Node {
    type: "Program";
    body: [ Statement ];
  }
  ```

* 函数
  ```typescript
  // 函数声明或函数表达式
  interface Function <: Node {
    id: Identifier | null;
    params: [ Pattern ];
    defaults: [ Expression ];
    rest: Identifier | null;
    body: BlockStatement | Expression;
    generator: boolean; // 如果generate为true，该函数是一个generate函数，在ie中，函数表达式的body里面会有`yield`标记，其他浏览器中会有一个嵌套的函数
    expression: boolean;
  }
  ```
* 语句
  ```typescript
  interface Statement <: Node {}
  ```
* 任意语句
  ```typescript
  // 一个空语句，也就是一个独立的分号
  interface EmptyStatement <: Statement {
    type: "EmptyStatement";
  }
  ```
  ```typescript
  // 一个块语句，也就是由大括号包围的语句序列
  interface BlockStatement <: Statement {
    type: "BlockStatement";
    body: [ Statement ];
  }
  ```

* 声明
  ```typescript
  // 任意的声明节点
  interface Declaration <: Statement {}
  ```
  ```typescript
  // 函数声明
  interface FunctionDeclaration <: Function, Declaration {
    type: "FunctionDeclaration";
    id: Identifier;
    params: [ Pattern ];
    defaults: [ Expression ];
    rest: Identifier | null;
    body: BlockStatement | Expression;
    generator: boolean;
    expression: boolean;
  }
  ```
  ```typescript
  // 变量声明
  interface VariableDeclaration <: Declaration {
    type: "VariableDeclaration";
    declarations: [ VariableDeclarator ];
    kind: "var" | "let" | "const";
  }
  ```

* 表达式
  ```typescript
  // 任意节点表达式
  interface Expression <: Node, Pattern { }
  ```
  ```typescript
  // this表达式
  interface ThisExpression <: Expression {
    type: "ThisExpression";
  }
  ```
  ```typescript
  // 数组表达式
  interface ArrayExpression <: Expression {
    type: "ArrayExpression";
    elements: [ Expression | null ];
  }
  ```
  ```typescript
  // 对象表达式
  interface ObjectExpression <: Expression {
    type: "ObjectExpression";
    properties: [ { key: Literal | Identifier,
                    value: Expression,
                    kind: "init" | "get" | "set" } ];
  }
  ```
  ```typescript
  // 函数表达式
  interface FunctionExpression <: Function, Expression {
    type: "FunctionExpression";
    id: Identifier | null;
    params: [ Pattern ];
    defaults: [ Expression ];
    rest: Identifier | null;
    body: BlockStatement | Expression;
    generator: boolean;
    expression: boolean;
  }
  ```

### esprima

> Esprima (esprima.org, BSD license) 是一个用JavaScript编写的高性能的,遵循`ECMAScript`标准的解析器。

我们可以直接使用`esprima`来将js源码解析成一棵标准的抽象语法树。`esprima`提供了`parseScript`和`parseModule`两个方法来解析js源码，顾名思义，这两个方法的区别是：`parseScript`用来解析普通的js脚本，如变量声明，函数声明，变量运算等；`parseModule`用来解析与模块相关的语句，如`import esprima from 'esprima'`。如果这两个方法选错了，`esprima`解析时就会抛出异常。来看个官方示例：
```javascript
const esprima = require('esprima');

const scriptCode = `const foo = 'hello'`;
const moduleCode = `import esprima from 'esprima'`;

const scriptAst = esprima.parseScript(scriptCode); // 用parseScript解析
// Script {
//   type: 'Program',
//   body:
//    [ VariableDeclaration {
//        type: 'VariableDeclaration',
//        declarations: [Array],
//        kind: 'const' } ],
//   sourceType: 'script'
// }

const moduleAst = esprima.parseModule(moduleCode);
// Module {
//   type: 'Program',
//   body:
//    [ ImportDeclaration {
//        type: 'ImportDeclaration',
//        specifiers: [Array],
//        source: [Literal] } ],
//   sourceType: 'module'
// }

// 错误示例
esprima.parseScript('export const answer = 42');
// Error: Line 1: Unexpected token
```

我们尝试一下用`parseModule`解析普通的js脚本：
```javascript
esprima.parseModule('answer = 42');
// Module {
//   type: 'Program',
//   body:
//    [ VariableDeclaration {
//        type: 'VariableDeclaration',
//        declarations: [Array],
//        kind: 'const' } ],
//   sourceType: 'module'
// }
```
我们发现可以正常解析。我刚开始`parseModule`需要具体到代码是否包含`import`, `export`等语句，但实际上并不需要，通过下面的对比可以发现两个方法产生的结果只有`sourceType`属性不同:
```javascript
esprima.parseModule('answer = 42');
// {
//   "type": "Program",
//   "body": [
//     {
//       "type": "ExpressionStatement",
//       "expression": {
//         "type": "AssignmentExpression",
//         "operator": "=",
//         "left": {
//           "type": "Identifier",
//           "name": "answer"
//         },
//         "right": {
//           "type": "Literal",
//           "value": 42,
//           "raw": "42"
//         }
//       }
//     }
//   ],
//   "sourceType": "module"
// }

esprima.parseScript('answer = 42');
// {
//   "type": "Program",
//   "body": [
//     {
//       "type": "ExpressionStatement",
//       "expression": {
//         "type": "AssignmentExpression",
//         "operator": "=",
//         "left": {
//           "type": "Identifier",
//           "name": "answer"
//         },
//         "right": {
//           "type": "Literal",
//           "value": 42,
//           "raw": "42"
//         }
//       }
//     }
//   ],
//   "sourceType": "script"
// }
```
写个稍微复杂点的例子来测试一下：
```javascript
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
// true
```


### recast

[recast](https://github.com/benjamn/recast)是一个将js代码转换成Abstract Syntax Tree的开源工具，它基于[esprima](https://github.com/jquery/esprima/)开发。相当于对`esprima`进行了一层封装优化。比如用`esprima`解析js源码时，有两个接口使用，`parseModule`和`parseScript`
