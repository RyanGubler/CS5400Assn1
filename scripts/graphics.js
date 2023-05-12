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
        let distanceX = Math.abs(x2-x1);
        let distanceY = Math.abs(y2-y1);
        let slope = distanceY/distanceX;
        let b = y1 - slope * x1;
        let x_k = x1;
        let y_k = y1;
        let c = 2 * distanceY + distanceX * (2*b - 1);
        let p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
        if(x1 < x2 && y2 < y1 && distanceX < distanceY){ //if x and y are in octant 0
            [distanceX, distanceY] = [distanceY, distanceX]
            slope = distanceY/distanceX;
            b = y1 - slope * x1;
            c = 2 * distanceY + distanceX * (2*b - 1);
            p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
            while(y_k >= y2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    x_k++;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                y_k--;
            }
        }
        else if(x1 <= x2 && y2 >= y1 && distanceX <= distanceY){ //if x and y are in octant 3
            [distanceX, distanceY] = [distanceY, distanceX]
            slope = distanceY/distanceX;
            b = y1 - slope * x1;
            c = 2 * distanceY + distanceX * (2*b - 1);
            p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
            while(y_k <= y2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    x_k++;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                y_k++;
            }
        }
        else if(x1 >= x2 && y2 >= y1 && distanceX <= distanceY){ //if x and y are in octant 4
            [distanceX, distanceY] = [distanceY, distanceX]
            slope = distanceY/distanceX;
            b = y1 - slope * x1;
            c = 2 * distanceY + distanceX * (2*b - 1);
            p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
            while(y_k <= y2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    x_k--;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                y_k++;
            }
        }
        else if(x1 >= x2 && y2 <= y1 && distanceX <= distanceY){ //if x and y are in octant 7
            [distanceX, distanceY] = [distanceY, distanceX]
            slope = distanceY/distanceX;
            b = y1 - slope * x1;
            c = 2 * distanceY + distanceX * (2*b - 1);
            p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
            while(y_k >= y2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    x_k--;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                y_k--;
            }
        }
        else if(x1 <= x2 && y1 >= y2){ //if x and y are in octanct 1
            while(x_k < x2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    y_k--;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                x_k++;
            }
        }
        else if(x1 <= x2 && y1 <= y2  ){ //if x and y are in octant 2
            while(x_k < x2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    y_k++;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                x_k++;
            }
        }
        else if(x1 >= x2 && y1 <= y2){ //if x and y are in octant 5
            while(x_k > x2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    y_k++;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                x_k--;
            }
        }
        else if(x1 > x2 && y1 > y2){ //if x and y are in octant 6
            while(x_k > x2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    y_k--;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                x_k--;
            }
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
}(150, 150, true));
