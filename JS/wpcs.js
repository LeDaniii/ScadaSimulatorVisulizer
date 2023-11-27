// WPCs ----------
function wpcData () {
    this.id = 1000;
    this.serialNumber = "";
    this.measurement = 1;
}

let wpcs = [
    { id: 1, x: 50, y: 75, width: 50, height: 50, xDirection: 1, yDirection: 1, wpcData: new wpcData() },
    { id: 2, x: 150, y: 75, width: 50, height: 50, xDirection: 1, yDirection: 1, wpcData: new wpcData()},
    { id: 3, x: 250, y: 75, width: 50, height: 50, xDirection: 1, yDirection: 1, wpcData: new wpcData() },
    { id: 4, x: 350, y: 75, width: 50, height: 50, xDirection: 1, yDirection: 1, wpcData: new wpcData() },
    { id: 5, x: 450, y: 75, width: 50, height: 50, xDirection: 1, yDirection: 1, wpcData: new wpcData() },
    { id: 6, x: 450, y: 1375, width: 50, height: 50, xDirection: 1, yDirection: 1, wpcData: new wpcData() },
    { id: 7, x: 350, y: 1375, width: 50, height: 50, xDirection: 1, yDirection: 1, wpcData: new wpcData() },
    { id: 8, x: 250, y: 1375, width: 50, height: 50, xDirection: 1, yDirection: 1, wpcData: new wpcData()},
    { id: 9, x: 150, y: 1375, width: 50, height: 50, xDirection: 1, yDirection: 1, wpcData: new wpcData() },
    { id: 10, x: 50, y: 1375, width: 50, height: 50, xDirection: 1, yDirection: 1, wpcData: new wpcData() },
];

export { wpcs };
