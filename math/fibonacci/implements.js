"use strict";

function fibonacci_a (n) {
  if (n == 1 || n === 2) {
    return 1;
  }

  return fibonacci_a(n - 2) + fibonacci_a(n - 1);
}

function fibonacci_b (n) {
  if (n === 1 || n === 2) {
    return 1;
  }

  let prev = 1, current = 1;
  for (let i = 3; i <= n; i++) {
    const tmp = current;
    current = current + prev;
    prev = tmp;
  }
  return current;
}

function fibonacci_c (n) {
  return Math.round((1/Math.sqrt(5)) * (Math.pow((1 + Math.sqrt(5)) / 2, n) - Math.pow((1 - Math.sqrt(5)) / 2, n)));
}

module.exports = {
  fibonacci_a,
  fibonacci_b,
  fibonacci_c
}
