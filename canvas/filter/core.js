var start;
onmessage = getStart;

function getStart(event) {
  const { index, rows, imageData, radius, weightMatrix } = event.data;
  const dataArray = [];
  const mh = (index + 1) * rows > imageData.height ? imageData.height : (index + 1) * rows; // 最后一个线程处理的行数不一定是足量的rows

  console.time(`process ${index} takes: `);

  /**
   * 遍历像素点
   */
  for (let y = index * rows; y < mh; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const p = (y * imageData.width + x) * 4;

      // if (index === 8) {
      //   debugger
      // }

      /**
       * 遍历像素点周围像素，根据权重矩阵计算像素值
       */
      let r = 0, g = 0, b = 0;
      for (let dy = 0; dy <= radius * 2; dy++) {
        for (let dx = 0; dx <= radius * 2; dx++) {
          let tx = Math.abs(x + (dx - radius)); // 取绝对值（边界处理）
          let ty = Math.abs(y + (dy - radius));
          if (tx > imageData.width - 1) { // 处理边界情况，边界的像素点，以x/z轴取对称部分补全
            tx = x - (dx - radius);
          }
          if (ty > imageData.height - 1) {
            ty = y - (dy - radius);
          }
          const tp = (ty * imageData.width + tx) * 4;
          const weight = weightMatrix[dy][dx];
          r = r + imageData.data[tp] * weight;
          g = g + imageData.data[tp + 1] * weight;
          b = b + imageData.data[tp + 2] * weight;
        }
      }

      dataArray.push(...[ r, g, b, imageData.data[p + 3] ]);
    }
  }

  console.timeEnd(`process ${index} takes: `);

  postMessage({
    p: index,
    dataArray
  });

}
