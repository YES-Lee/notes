const { bubbleSort, mergeSort, merge } = require('./sort');

const arr = [6, 3, 5, 2, 0, 9, 1, 10, 4];

console.time('冒泡排序');
bubbleSort(arr);
console.timeEnd('冒泡排序');
console.log(arr);
console.log('***********************************');

console.time('归并排序');
const sorted = mergeSort(arr);
console.timeEnd('归并排序');
console.log(sorted);
console.log('***********************************');
