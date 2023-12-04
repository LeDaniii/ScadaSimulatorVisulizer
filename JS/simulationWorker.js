let updateInterval = 10;
let isRunning = false;
// TODO: Implement is Runnung -> break up runSimulation and updatePositions into two functions and call them from a new function startSimulation and stopSimulation

function runSimulation(wpcs, stopper) {

    function isCollidingX(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
    }

    function isCollidingY(rect1, rect2) {
        return rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
    }

    function isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    }

    function updatePositions() {
        wpcs.forEach(wpc => {
            // Check if the WPC is colliding with the stopper
            if (isColliding(wpc, stopper)) {
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
    if(e.data.type === 'devData') {
        updateInterval = e.data.data.updateInterval;
        console.log(`${updateInterval}`);
    }
    else {
        // run Simulation
        const wpcs = e.data.wpcs;
        const stopper = e.data.stopper;
        runSimulation(wpcs, stopper);
    }
}