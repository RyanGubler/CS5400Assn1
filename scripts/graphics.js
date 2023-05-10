// ------------------------------------------------------------------
// 
// This is the graphics object.  It provides a pseudo pixel rendering
// space for use in demonstrating some basic rendering techniques.
//
// ------------------------------------------------------------------
MySample.graphics = (function(pixelsX, pixelsY, showPixels) {
    'use strict';

    let canvas = document.getElementById('canvas-main');
    let context = canvas.getContext('2d', { alpha: false });

    let deltaX = canvas.width / pixelsX;
    let deltaY = canvas.height / pixelsY;

    //------------------------------------------------------------------
    //
    // Public function that allows the client code to clear the canvas.
    //
    //------------------------------------------------------------------
    function clear() {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();

        //
        // Draw a very light background to show the "pixels" for the framebuffer.
        if (showPixels) {
            context.save();
            context.lineWidth = .1;
            context.strokeStyle = 'rgb(150, 150, 150)';
            context.beginPath();
            for (let y = 0; y <= pixelsY; y++) {
                context.moveTo(1, y * deltaY);
                context.lineTo(canvas.width, y * deltaY);
            }
            for (let x = 0; x <= pixelsX; x++) {
                context.moveTo(x * deltaX, 1);
                context.lineTo(x * deltaX, canvas.width);
            }
            context.stroke();
            context.restore();
        }
    }

    //------------------------------------------------------------------
    //
    // Public function that renders a "pixel" on the framebuffer.
    //
    //------------------------------------------------------------------
    function drawPixel(x, y, color) {
        context.fillStyle = color;
        context.fillRect(Math.floor(x * deltaX), Math.floor(y * deltaY), Math.ceil(deltaX), Math.ceil(deltaY));
    }

    //------------------------------------------------------------------
    //
    // Bresenham line drawing algorithm.
    //
    //------------------------------------------------------------------
    function drawLine(x1, y1, x2, y2, color) {
      if(x2 < x1){
        let temp = x2;
        x2 = x1;
        x1 = temp;
      }
      if(y2 < y1){
        let temp = y2;
        y2 = y1;
        y1 = temp;
      }
      let distanceX = x2-x1;
      let distanceY = y2-y1;
      if(distanceX < distanceY){
        tempX1 = x1;
        tempX2 = x2;
        x1 = y1;
        x2 = y2;
        y1 = tempX1;
        y2 = tempX2;
        distanceX = x2-x1;
        distanceY = y2-y1;
      }
      let slope = distanceY/distanceX;
      let b = y1 - slope * x1;
      let x_k = x1;
      let y_k = y1;
      let c = 2 * distanceY + distanceX * (2*b - 1);
      let p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
      let p_0 = 2 * distanceY - distanceX;
      if(p_k >= 0){
        p_k = p_k + (2 * distanceY) - (2 * distanceX);
        while(x_k !== x2){
            x_k++;
            y_k--;
          drawPixel(x_k, y_k, color);
        }
      }else{

      }
    }

    let api = {
        clear: clear,
        drawPixel: drawPixel,
        drawLine: drawLine,
        get sizeX() { return pixelsX; },
        get sizeY() { return pixelsY; }
    };

    return api;
}(250, 250, true));
