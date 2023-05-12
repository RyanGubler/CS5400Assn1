MySample.main = (function(graphics) {
    'use strict';
    
    let ptCenter = {x: graphics.sizeX / 2, y: graphics.sizeY / 2};
    let ptEnd = {x: graphics.sizeX /2, y: graphics.sizeY / 3};
    let ptHourHand = {x: graphics.sizeX / 2, y: graphics.sizeY / 3 + 75};
    let previousTime = performance.now();

    //------------------------------------------------------------------
    //
    // Scene updates go here.
    //
    //------------------------------------------------------------------

    function update(elapsedTime) {
        const rotationRate = 0.0015;
        const hourRate = rotationRate / 12;
        ptEnd = {
            x: (ptEnd.x - ptCenter.x) * Math.cos(rotationRate * elapsedTime) - (ptEnd.y - ptCenter.y) * Math.sin(rotationRate * elapsedTime) + ptCenter.x,
            y: (ptEnd.x - ptCenter.x) * Math.sin(rotationRate * elapsedTime) + (ptEnd.y - ptCenter.y) * Math.cos(rotationRate * elapsedTime) + ptCenter.y
        }
        ptHourHand = {
            x: (ptHourHand.x - ptCenter.x) * Math.cos(hourRate * elapsedTime) - (ptHourHand.y - ptCenter.y) * Math.sin(hourRate * elapsedTime) + ptCenter.x,
            y: (ptHourHand.x - ptCenter.x) * Math.sin(hourRate * elapsedTime) + (ptHourHand.y - ptCenter.y) * Math.cos(hourRate * elapsedTime) + ptCenter.y
        } 
    }

    //------------------------------------------------------------------
    //
    // Rendering code goes here
    //
    //------------------------------------------------------------------
    function render() {
        graphics.clear();
        graphics.drawLine(ptCenter.x, ptCenter.y, Math.trunc(ptEnd.x), Math.trunc(ptEnd.y), 'rgb(80, 130, 100)');
        graphics.drawLine(ptCenter.x, ptCenter.y, Math.trunc(ptHourHand.x), Math.trunc(ptHourHand.y), 'rgb(180, 130, 0)');
    }

    //------------------------------------------------------------------
    //
    // This is the animation loop.
    //
    //------------------------------------------------------------------
    function animationLoop(time) {
        let elapsedTime = time - previousTime;
        previousTime = time;

        update(elapsedTime);
        render();

        requestAnimationFrame(animationLoop);
    }

    console.log('initializing...');
    requestAnimationFrame(animationLoop);

}(MySample.graphics));
