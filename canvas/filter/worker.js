// 创建计算进程
self.onmessage = function (ev) {
  const { imageData, weightMatrix } = ev.data;
  const radius = (weightMatrix.length - 1) / 2;

  const core_num = 1;

  // start the workers
  let pending_workers = core_num;

  let resultData, originImageData;

  originImageData = imageData;

  const rows = Math.round(imageData.height / core_num); // 每个线程最多处理多少行数据

  resultData = new ImageData(imageData.width, imageData.height);

  for (let p = 0; p < core_num; p++) {
    const process = new Worker('core.js');
    process.postMessage({
      index: p,
      rows,
      radius,
      weightMatrix,
      imageData
    });

    process.onmessage = function (event) {
      const { p, dataArray } = event.data;

      const offset = p * rows * originImageData.width * 4;
      console.log(p, offset);
      resultData.data.set(dataArray, offset);

      pending_workers -= 1;
      if (pending_workers <= 0) {
        console.log(resultData);
        postMessage(resultData);
      }
    }
  }
}
