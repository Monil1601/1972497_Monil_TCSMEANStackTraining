let fs = require("fs");

let logger = (arr, file) => {
    JsonStr = JSON.stringify(arr);
    fs.writeFileSync(file, JsonStr);
}

module.exports = {logger};