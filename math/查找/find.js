function binFind (arr = [], val) {
  arr.sort();
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const middle = (left + right) / 2;
    if (val === arr[middle]) {
      return true;
    } else {
      if (val > arr[middle]) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }
  }
  return false;
}

module.exports = {
  binFind
}
