onmessage = function (e) {
    const wpcs = e.data.wpcs;
    const stopper = e.data.stopper;

    // Update WPC positions (simplified logic for example)
    wpcs.forEach(wpc => {
        // Add your collision detection and position update logic here
        // For example, just moving WPCs to the right for demonstration
        wpc.x += 1;
        if (wpc.x > 1500) { // Reset position for demonstration
            wpc.x = 0;
        }
    });

    // Send the updated positions back to the main script
    postMessage(wpcs);
    postMessage(updatedData);
};

setInterval(() => {
    // triggering onmessage to continue the loop
    postMessage({});
}, 1000 / 60);