function a () {
  let i = 0;
  console.log(i);
  function b () {
    i++;
    console.log(i);
  }
  return b;
}

let fb = a();
fb();
