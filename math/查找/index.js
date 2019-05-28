const { binFind } = require('./find');

const arr = [2,6,4,8,7,9,10];

console.time('二分查找');
console.log(binFind(arr, 4));
console.timeEnd('二分查找');
