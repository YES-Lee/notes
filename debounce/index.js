function test () {
  console.log('执行函数');
}

/**
 * 在设定时间间隔内连续触发时，刷新计时器，即使结束后才会执行下一次触发
 * @param {*} func
 * @param {*} delay
 */
function debounce (func, delay, immediate = true) {
  let timer;
  let lock = !immediate;
  return function (params) {
    return new Promise((resolve, reject) => {
      if (lock) {
        // 触发间隔未结束，重新设定计时器
        clearTimeout(timer);
        timer = setTimeout(() => {
          lock = false;
          clearTimeout(timer);
          timer = null;
          if (!immediate) {
            resolve(func(params));
          }
        }, delay);
      } else {
        lock = true;
        resolve(func(params));
      }
    });
  };
}

let debounced = debounce(test, 100);

let t = 0;
let interval = setInterval(() => {
  if (t > 10) {
    clearInterval(interval);
    return;
  }
  debounced();
  t++;
}, 10);
