MySample.main = (function(graphics) {
    'use strict';
    
    let ptCenter = {x: graphics.sizeX / 2, y: graphics.sizeY / 2};
    let ptEnd = {x: graphics.sizeX / 2, y: graphics.sizeY / 4};

    let previousTime = performance.now();


    //------------------------------------------------------------------
    //
    // Scene updates go here.
    //
    //------------------------------------------------------------------

    function update(elapsedTime) {
        const rotationRate = 0.001;
        ptEnd = {
            x: (ptEnd.x - ptCenter.x) * Math.cos(rotationRate * elapsedTime) - (ptEnd.y - ptCenter.y) * Math.sin(rotationRate * elapsedTime) + ptCenter.x,
            y: (ptEnd.x - ptCenter.x) * Math.sin(rotationRate * elapsedTime) + (ptEnd.y - ptCenter.y) * Math.cos(rotationRate * elapsedTime) + ptCenter.y
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
        graphics.drawLine(100, 80, 120, 150, 'rgb(255, 0, 0)');
        graphics.drawLine(50, 20, 90, 60, 'rgb(0, 255, 0)');
        graphics.drawLine(30, 30, 50, 35, 'rgb(0, 0, 255)');
        
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
