import { wpcs } from "./JS/wpcs.js";
import { devUpdate } from './JS/uiInteractions.js';

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

    const strokeWidth = 2; 
    const wpcSelection = svgGroup.selectAll(".wpc")
        .data(wpcs)
        .enter()
        .append("rect")
        .classed("wpc", true)
        .attr("x", d => d.x - strokeWidth / 2) // Adjust x position to account for stroke width
        .attr("y", d => d.y - strokeWidth / 2) // Adjust y position to account for stroke width
        .attr("width", wpcs[0].width)
        .attr("height", wpcs[0].height)
        .style("fill", "blue")
        .style("stroke", "red") // Set the stroke color to red
        .style("stroke-width", strokeWidth); // Set the stroke width
    
    // Animation loop ----------
    // Create a new worker
    const worker = new Worker('./JS/simulationWorker.js');

    // Worker Data from Interactions
    devUpdate(worker);

    // Listen for messages from the worker
    worker.onmessage = function (e) {
        const updatedWpcs = e.data;
        updateFrontend(updatedWpcs);
    }

    function updateFrontend(data) {
        wpcSelection.data(data, function (d) { return d.id; }).attr("x", d => d.x).attr("y", d => d.y);
    }

    // Start the animation loop
    worker.postMessage({ wpcs: wpcs, stopper: stopper });

    // Tooltip ----------
    // Select conveyor items (WPCs)
    const toolTipWpcs = svg.selectAll(".wpc");

    // Show tooltip
    toolTipWpcs.on("mouseover", function(event, wpc) {
    d3.select("#tooltip")
        .style("display", "inline")
        .html(`Data: ${wpc.wpcData.measurement}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", function() {
        d3.select("#tooltip").style("display", "none");
    });
});