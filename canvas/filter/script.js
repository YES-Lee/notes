(function () {
  window.onload = main;



  function main () {
    const selector = document.getElementById('filter-selector');
    const confirmBtn = document.getElementById('confirm-btn');
    const originCanvas = document.getElementById('origin-canvas');
    const dirtyCanvavs = document.getElementById('dirty-canvas');
    const oCtx = originCanvas.getContext('2d');
    const dCtx = dirtyCanvavs.getContext('2d');

    const image = new Image();
    image.src = 'demo.jpg';

    image.onload = function () {

      let drawWidth, drawHeight;
      const cw = originCanvas.width, ch = originCanvas.height;
      if (image.width > image.height) {
        drawWidth = cw;
        drawHeight = cw * image.height / image.width;
      } else {
        drawHeight = ch;
        drawWidth = ch * image.width / image.height;
      }
      oCtx.drawImage(image, 0, 0, image.width, image.height, (cw - drawWidth) / 2, (ch - drawHeight) / 2, drawWidth, drawHeight);

      confirmBtn.addEventListener('click', () => {
        const filterName = selector.value
        const originImageData = oCtx.getImageData(0, 0, cw, ch);

        switch (filterName) {
          case 'gray': {
            dCtx.clearRect(0, 0, dirtyCanvavs.width, dirtyCanvavs.height);
            const dirty = grayFilter(originImageData);
            dCtx.putImageData(dirty, 0, 0);
            break;
          };
          case 'black': {
            dCtx.clearRect(0, 0, dirtyCanvavs.width, dirtyCanvavs.height);
            const dirty = blackFilter(originImageData);
            dCtx.putImageData(dirty, 0, 0);
            break;
          };
          case 'reverse': {
            dCtx.clearRect(0, 0, dirtyCanvavs.width, dirtyCanvavs.height);
            const dirty = reverseFilter(originImageData);
            dCtx.putImageData(dirty, 0, 0);
            break;
          };
          case 'blur': {
            dCtx.clearRect(0, 0, cw, ch);
            const imageData = oCtx.getImageData(0, 0, cw, ch / 2);
            console.time('模糊耗时：');
            // const dirty = blurFilter(imageData, 20);
            // console.timeEnd('模糊耗时：');
            // dCtx.putImageData(originImageData, 0, 0);
            // dCtx.clearRect(0, 0, cw, ch / 2);
            // dCtx.putImageData(dirty, 0, 0);
            blurFilter(imageData, 10).then(dirty => {
              console.timeEnd('模糊耗时：');
              dCtx.putImageData(originImageData, 0, 0);
              dCtx.clearRect(0, 0, cw, ch / 2);
              dCtx.putImageData(dirty, 0, 0);
            });
            break;
          };
          default:
            break;
        }
      });
    };
  }

  function grayFilter (imageData) {
    const dirtyData = new ImageData(imageData.width, imageData.height);
    for (let i = 0; i < imageData.data.length; i = i + 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const a = imageData.data[i + 3];
      const gray = (r + g + b) / 3;
      dirtyData.data.set([ gray, gray, gray, a ], i);
    }
    return dirtyData;
  }

  function blackFilter (imageData) {
    const dirtyData = new ImageData(imageData.width, imageData.height);
    for (let i = 0; i < imageData.data.length; i = i + 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const a = imageData.data[i + 3];
      const gray = (r + g + b) / 3 > 128 ? 255 : 0;
      dirtyData.data.set([ gray, gray, gray, a ], i);
    }
    return dirtyData;
  }

  function reverseFilter (imageData) {
    const dirtyData = new ImageData(imageData.width, imageData.height);
    for (let i = 0; i < imageData.data.length; i = i + 4) {
      const r = 255 - imageData.data[i];
      const g = 255 - imageData.data[i + 1];
      const b = 255 - imageData.data[i + 2];
      const a = imageData.data[i + 3];
      dirtyData.data.set([ r, g, b, a ], i);
    }
    return dirtyData;
  }

  function blurFilter (imageData, blurRadius) {
    const dirtyData = new ImageData(imageData.width, imageData.height);

    const weightMatrix = getWeightMatrix(blurRadius);

    console.table(weightMatrix);

    const worker = new Worker('worker.js');
    worker.postMessage({
      imageData,
      weightMatrix
    });
    return new Promise((resolve, reject) => {
      worker.onmessage = function (event) {
        resolve(event.data);
      };
    });

    /**
     * 遍历像素点
     */
    // for (let y = 0; y < imageData.height; y++) {
    //   for (let x = 0; x < imageData.width; x++) {
    //     const p = (y * imageData.width + x) * 4;

    //     /**
    //      * 遍历像素点周围像素，根据权重矩阵计算像素值
    //      */
    //     let r = 0, g = 0, b = 0;
    //     for (let dy = 0; dy <= blurRadius * 2; dy++) {
    //       for (let dx = 0; dx <= blurRadius * 2; dx++) {
    //         let tx = Math.abs(x + (dx - blurRadius)); // 取绝对值（边界处理）
    //         let ty = Math.abs(y + (dy - blurRadius));
    //         if (tx > imageData.width - 1) { // 处理边界情况，边界的像素点，以x/z轴取对称部分补全
    //           tx = x - (dx - blurRadius);
    //         }
    //         if (ty > imageData.height - 1) {
    //           ty = y - (dy - blurRadius);
    //         }
    //         const tp = (ty * imageData.width + tx) * 4;
    //         const weight = weightMatrix[dy][dx];
    //         r = r + imageData.data[tp] * weight;
    //         g = g + imageData.data[tp + 1] * weight;
    //         b = b + imageData.data[tp + 2] * weight;
    //       }
    //     }

    //     dirtyData.data.set([ r, g, b, imageData.data[p + 3] ], p);
    //   }
    // }
    // console.log(imageData)
    // console.log(dirtyData)
    // return dirtyData;
  }

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

  function gaussian2D (x, y) {
    const delta = 5;
    const up = Math.exp(-(x * x + y * y) / (2 * delta * delta));
    const down = 2 * Math.PI * delta * delta;
    return up / down;
  }
})();