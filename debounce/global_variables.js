function debounce (func, delay, immediate = true) {
  let timer;
  let lock = !immediate;
  return function (params) {
    if (lock) {
      // 触发间隔未结束，重新设定计时器
      clearTimeout(timer);
      timer = setTimeout(() => {
        lock = false;
        clearTimeout(timer);
        timer = null;
        if (!immediate) {
          func(params);
        }
      }, delay);
    } else {
      lock = true;
      func(params);
    }
  };
}

// function debounce (func, delay) {
//   let timer;
//   let lock = false;
//   return function (params) {
//     if (lock) {
//       // 触发间隔未结束，重新设定计时器
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         lock = false;
//         clearTimeout(timer);
//         timer = null;
//       }, delay);
//     } else {
//       lock = true;
//       func(params);
//     }
//   };
// }

function submit () {
  console.log('提交完毕');
}

const debouncedSubmit = debounce(submit, 100, false);

function invoke () {
  let i = 0;
  const timer = setInterval(() => {
    if (i > 1) {
      clearInterval(timer);
      return
    }
    debouncedSubmit();
    i++;
  }, 90);
}

invoke();
