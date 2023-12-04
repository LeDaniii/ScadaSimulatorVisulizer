const devUpdateButton = document.querySelector("#devUpdateButton");
const updateInterval = document.querySelector("#updateInterval");

const devUpdate = (worker) => {
    devUpdateButton.addEventListener("click", () => {
        worker.postMessage({ type: 'devData', data: { updateInterval: updateInterval.value }});
    })
}

export { devUpdate };