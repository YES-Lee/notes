const { fibonacci_a, fibonacci_b, fibonacci_c } = require('./implements');

console.time('递归算法执行时间');
console.log(fibonacci_a(40));
console.timeEnd('递归算法执行时间');
console.time('循环算法执行时间');
console.log(fibonacci_b(40));
console.timeEnd('循环算法执行时间');
console.time('通项公式算法执行时间');
console.log(fibonacci_c(40));
console.timeEnd('通项公式算法执行时间');
