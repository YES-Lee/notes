"use strict";

/**
 * 冒泡排序
 * @param {*} arr
 */
function bubbleSort (arr = []) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      }
    }
  }
}

/**
 * 归并排序
 * @param {*} arr
 */
function mergeSort (arr = []) {
  let left = [], right = [];

  // *****separate start*****
  if (arr.length <= 1) {
    return arr;
  }
  left = arr.splice(0, arr.length / 2)
  left = mergeSort(left);
  right = mergeSort(arr);
  // *****separate end*****

  // ******merge start*****
  const merged = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      merged.push(left.shift());
    } else {
      merged.push(right.shift());
    }
  }

  merged.push(...left);
  merged.push(...right);

  return merged;
  // ******merge end*****
}

module.exports = {
  bubbleSort,
  mergeSort
}
