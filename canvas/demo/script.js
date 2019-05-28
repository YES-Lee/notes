(function () {
  window.onload = main;

  function drawGrid (canvas, size = 20) {
    const ctx = canvas.getContext('2d');

    const cols = Math.round(canvas.width / size);
    const rows = Math.round(canvas.height / size);

    ctx.strokeStyle = '#ccc';

    for (let i = 0; i < cols; i++) {
      ctx.beginPath();
      ctx.moveTo(size * i, 0);
      ctx.lineTo(size * i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < rows; j++) {
      ctx.beginPath();
      ctx.moveTo(0, size * j);
      ctx.lineTo(canvas.width, size * j);
      ctx.stroke();
    }
  }

  function main () {
    const magnifierBtn = document.getElementById('magnifier');
    const canvas = document.getElementById('canvas');
    drawGrid(canvas);
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = 'demo.jpg';

    image.onload = function () {
      const slider = document.getElementById('slider');
      scaleImage(image, canvas, slider.value);
      slider.addEventListener('input', (e) => {
        const slider = document.getElementById('slider');
        scaleImage(image, canvas, slider.value);
      })

      magnifierBtn.disabled = false;

    }

    magnifierBtn.addEventListener('click', (() => {
      let magnifier = null;
      return function () {
        if (magnifier) {
          magnifier.close();
          magnifier = null;
          magnifierBtn.classList.remove('active')
        } else {
          magnifier = initMagnifier(canvas, image);
          magnifierBtn.classList.add('active')
        }
      };
    })());

  }

  /**
   * 初始化放大镜
   * @param {} canvas
   * @param {} image
   */
  function initMagnifier (canvas, image) {
    // 隐形的一层div，用来捕捉鼠标移动
    const maskDiv = document.createElement('div');
    const canvasRect = canvas.getBoundingClientRect();
    maskDiv.style.width = canvas.width + 'px';
    maskDiv.style.height = canvas.height + 'px';
    maskDiv.style.position = 'absolute';
    maskDiv.style.display = 'none';
    maskDiv.style.left = canvasRect.x + 'px';
    maskDiv.style.top = canvasRect.y + 'px';
    maskDiv.style.zIndex = 99999;

    document.body.appendChild(maskDiv);

    const magnifier = document.createElement('canvas');
    magnifier.width = 200;
    magnifier.height = 200;
    magnifier.style.border = '2px solid #999';
    magnifier.style.position = 'absolute';
    magnifier.style.display = 'none';
    magnifier.style.zIndex = 99998;
    magnifier.style.borderRadius = '50%';

    const mCtx = magnifier.getContext('2d');

    document.body.appendChild(magnifier);

    maskDiv.addEventListener('mouseenter', (e) => {
      magnifier.style.display = 'block';
      magnifier.style.left = e.pageX - magnifier.width / 2 + 'px';
      magnifier.style.top = e.pageY - magnifier.height / 2 + 'px';
      const x = e.layerX, y = e.layerY;
      const imageWidth = canvas.width * 2;
      const imageHeight = canvas.height * 2;
      const dx = magnifier.width / 2 - x * 2;
      const dy = magnifier.height / 2 - y * 2;
      window.requestAnimationFrame(() => {
        mCtx.clearRect(0, 0, magnifier.width, magnifier.height);
        mCtx.drawImage(canvas, dx, dy, imageWidth, imageHeight);
      })
    });
    maskDiv.addEventListener('mousemove', (e) => {
      magnifier.style.display = 'block';
      magnifier.style.left = e.pageX - magnifier.width / 2 + 'px';
      magnifier.style.top = e.pageY - magnifier.height / 2 + 'px';
      const x = e.layerX, y = e.layerY;
      const imageWidth = canvas.width * 2;
      const imageHeight = canvas.height * 2;
      const dx = magnifier.width / 2 - x * 2;
      const dy = magnifier.height / 2 - y * 2;
      window.requestAnimationFrame(() => {
        mCtx.clearRect(0, 0, magnifier.width, magnifier.height);
        mCtx.drawImage(canvas, dx, dy, imageWidth, imageHeight);
      })
    });
    maskDiv.addEventListener('mouseleave', () => {
      magnifier.style.display = 'none';
      maskDiv.style.display = 'none';
    });

    canvas.addEventListener('mouseenter', unMount);

    function unMount (e) {
      maskDiv.style.display = 'block';
    }

    return {
      close () {
        canvas.removeEventListener('mouseenter', unMount);
        document.body.removeChild(maskDiv);
        document.body.removeChild(magnifier);
      }
    }
  }

  /**
   * 初始化图片放大器
   */
  function scaleImage (image, canvas, scale) {
    const ctx = canvas.getContext('2d');
    window.requestAnimationFrame(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imageWidth = image.width * scale;
      const imageHeight = image.height * scale;

      const dx = (canvas.width - imageWidth) / 2;
      const dy = (canvas.height - imageHeight) / 2;
      ctx.drawImage(image, dx, dy, imageWidth, imageHeight);
    });
  }

  /**
   * 绘制消息气泡
   */
  function drawPop () {
    ctx.beginPath();

    ctx.strokeStyle = '#00bcd4';
    ctx.moveTo(80, 80);
    ctx.quadraticCurveTo(80, 140, 140, 140);
    ctx.quadraticCurveTo(140, 180, 120, 180);
    ctx.quadraticCurveTo(180, 180, 180, 140);
    ctx.lineTo(240, 140);
    ctx.quadraticCurveTo(300, 140, 300, 80);
    ctx.quadraticCurveTo(300, 20, 240, 20);
    ctx.lineTo(140, 20);
    ctx.quadraticCurveTo(80, 20, 80, 80);
    ctx.stroke();
  }
})();