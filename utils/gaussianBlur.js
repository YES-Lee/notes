export default function blur (imageData, blurRadius) {
  const dirtyData = new ImageData(imageData.width, imageData.height);

  const weightMatrix = getWeightMatrix(blurRadius);

  console.table(weightMatrix);

  /**
   * 遍历像素点
   */
  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const p = (y * imageData.width + x) * 4;

      /**
       * 遍历像素点周围像素，根据权重矩阵计算像素值
       */
      let r = 0, g = 0, b = 0;
      for (let dy = 0; dy <= blurRadius * 2; dy++) {
        for (let dx = 0; dx <= blurRadius * 2; dx++) {
          const tx = Math.abs(x + (dx - blurRadius)); // 取绝对值（边界处理）
          const ty = Math.abs(y + (dy - blurRadius));
          const tp = (ty * imageData.width + tx) * 4;
          const weight = weightMatrix[dy][dx];
          r = r + imageData.data[tp] * weight;
          g = g + imageData.data[tp + 1] * weight;
          b = b + imageData.data[tp + 2] * weight;
        }
      }

      dirtyData.data.set([ r, g, b, imageData.data[p + 3] ], p);
    }
  }
  return dirtyData;
}

/**
 * 计算权重矩阵
 * @param {Number} radius 模糊半径
 */
function getWeightMatrix (radius) {
  const matrix = new Array(radius * 2 + 1);
  let sum = 0;
  for (let y = 0; y < radius * 2 + 1; y++) {
    matrix[y] = new Array(radius * 2 + 1);
    for (let x = 0; x < radius * 2 + 1; x++) {
      const fw = gaussian2D(x - radius, y - radius);
      matrix[y][x] = fw;
      sum = sum + fw;
    }
  }
  for (let y = 0; y < radius * 2 + 1; y++) {
    for (let x = 0; x < radius * 2 + 1; x++) {
      matrix[y][x] = matrix[y][x] / sum;
    }
  }
  return matrix;
}

/**
 * 计算像素点权重
 * @param {Number} x x坐标
 * @param {Number} y y坐标
 */
function gaussian2D (x, y) {
  const delta = 5;
  const up = Math.exp(-(x * x + y * y) / (2 * delta * delta));
  const down = 2 * Math.PI * delta * delta;
  return up / down;
}
