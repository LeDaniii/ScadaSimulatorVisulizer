import { wpcs } from "./JS/wpcs.js";

document.addEventListener("DOMContentLoaded", function () { 
const stopper = {    
    x: 800,
    y: 75,
    width: 5,
    height: 50
};

    // Define zoom behavior
    const zoom = d3.zoom()
    .scaleExtent([1, 10])
    .on("zoom", (event) => {
        svgGroup.attr("transform", event.transform);
    });

    const svg = d3.select("#simulation")
        .attr("width", "100vw")
        .attr("height", "100vh")
        .attr("background-color", "lightblue")
        .call(zoom);

    // Create a 'g' element which will contain all zoomable elements
    const svgGroup = svg.append("g");
    
    // Draw conveyor start ----------
    svgGroup.append("rect")
        .attr("x", 0)
        .attr("y", 50)
        .attr("width", 1400)
        .attr("height", 100)
        .style("fill", "lightgrey");
    
    svgGroup.append("rect")
        .attr("x", 1400)
        .attr("y", 50)
        .attr("width", 100)
        .attr("height", 1400)
        .style("fill", "lightgrey");
    
    svgGroup.append("rect")
        .attr("x", 0)
        .attr("y", 1350)
        .attr("width", 1400)
        .attr("height", 100)
        .style("fill", "lightgrey");
    
    svgGroup.append("rect")
        .attr("x", 0)
        .attr("y", 50)
        .attr("width", 100)
        .attr("height", 1400)
        .style("fill", "lightgrey");
    
    svgGroup.append("rect")
        .attr("x", stopper.x)
        .attr("y", stopper.y)
        .attr("width", stopper.width)
        .attr("height", stopper.height)
        .style("fill", "brown");
    // Draw conveyor end ----------

    const wpcSelection = svgGroup.selectAll(".wpc")
        .data(wpcs)
        .enter()
        .append("rect")
        .classed("wpc", true)
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("width", wpcs[0].width)
        .attr("height", wpcs[0].height)
        .style("fill", "blue");
    
    // Animation loop ----------
    const worker = new Worker('simulationWorker.js');

    worker.onmessage = function (e) {
        const updatedWpcs = e.data;
    
        worker.postMessage({ wpcs: updatedWpcs, stopper: stopper });
    }
    
    worker.postMessage({ wpcs: wpcs, stopper: stopper });
    
    function animateWPCs() {
        wpcs.forEach(wpc => {

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
    });

        // Update the position
        wpcSelection
            .data(wpcs)
            .attr("x", d => d.x)
            .attr("y", d => d.y);

        requestAnimationFrame(animateWPCs); // Keep the loop going
    }
    animateWPCs();

    // Tooltip ----------
    // Select conveyor items (WPCs)
    const toolTipWpcs = svg.selectAll(".wpc");

    // Show tooltip
    toolTipWpcs.on("mouseover", function(event, wpc) {
    d3.select("#tooltip")
        .style("display", "inline")
        .html(`Data: ${wpc.wpcData.measurement}`) // Replace `d.yourData` with the actual data you want to show
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", function() {
        d3.select("#tooltip").style("display", "none");
    });

    // Collision detection ----------
    function isCollidingX(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
    }

    function isCollidingY(rect1, rect2) {
        return rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
    }
});