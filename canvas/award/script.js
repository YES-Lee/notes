(function () {
  window.onload = main;

  const text = '一等奖'

  function main () {
    const maskCanvas = document.getElementById('mask_layer')
    const maskCtx = maskCanvas.getContext('2d')

    const textCanvas = document.createElement('canvas')
    const textCtx = textCanvas.getContext('2d')
    textCanvas.width = maskCanvas.width
    textCanvas.height = maskCanvas.height
    textCtx.textAlign = 'center'
    textCtx.textBaseline = 'middle'
    textCtx.font = '24px Verdana'
    textCtx.fillText(text, 60, 30)

    maskCtx.fillStyle = '#999'
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height)

    let isTouch = false
    maskCanvas.addEventListener('mousedown', (e) => {
      isTouch = true
    })
    maskCanvas.addEventListener('touchstart', (e) => {
      console.log('touch')
      isTouch = true
    })
    maskCanvas.addEventListener('mouseup', () => {
      isTouch = false
    })
    maskCanvas.addEventListener('touchend', () => {
      isTouch = false
    })
    maskCanvas.addEventListener('mouseout', () => {
      isTouch = false
    })
    maskCanvas.addEventListener('touchcancel', () => {
      isTouch = false
    })

    maskCanvas.addEventListener('mousemove', (e) => {
      if (isTouch) {
        const x = e.layerX
        const y = e.layerY
        const imageData = textCtx.getImageData(x - 4, y - 4, 8, 8)
        maskCtx.putImageData(imageData, x - 4, y - 4)
      }
    })
    maskCanvas.addEventListener('touchmove', (e) => {
      if (isTouch) {
        const x = e.layerX
        const y = e.layerY
        const imageData = textCtx.getImageData(x - 4, y - 4, 8, 8)
        maskCtx.putImageData(imageData, x - 4, y - 4)
      }
    })
  }
})();
