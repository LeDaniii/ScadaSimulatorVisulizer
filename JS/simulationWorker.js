function runSimulation(wpcs, stopper) {
    const updateInterval = 10;

    function isCollidingX(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
    }

    function isCollidingY(rect1, rect2) {
        return rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
    }

    function updatePositions() {
        wpcs.forEach(wpc => {
            // Collision detection ----------

        
            // Check if the WPC is colliding with the stopper
            if (isCollidingX(wpc, stopper)) {
                console.log("Collision detected!");
                wpc.wpcData.measurement = wpc.wpcData.measurement + 1;
                // wpc.xDirection = 0;
                // wpc.yDirection = 0;
            }
            if (wpc.x >= 25 && wpc.x <= 1425 && wpc.y == 75) {
                if (wpc.xDirection != 1) {
                    wpc.xDirection *= -1;
                }
                wpc.x += wpc.xDirection;
            }

            if (wpc.x == 1425 && wpc.y >= 50 && wpc.y <= 1375) {
                if (wpc.yDirection != 1) {
                    wpc.yDirection *= -1;
                }
                wpc.y += wpc.yDirection;
            }

            if (wpc.x >= 25 && wpc.x <= 1425 && wpc.y == 1375) {
                if (wpc.xDirection != -1) {
                    wpc.xDirection *= -1;
                }
                wpc.x += wpc.xDirection;
            }

            if (wpc.x == 25 && wpc.y >= 50 && wpc.y <= 1375) {
                if (wpc.yDirection != -1) {
                    wpc.yDirection *= -1;
                }
                wpc.y += wpc.yDirection;
            }

            postMessage(wpcs);
        }
        )
    }
    setInterval(updatePositions, updateInterval);
}

onmessage = function (e) { 
    const wpcs = e.data.wpcs;
    const stopper = e.data.stopper;
    
    runSimulation(wpcs, stopper);
}