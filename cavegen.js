// import * as fs from 'fs';
var caveSize = 100;
var spaceFactor = 0.55;
var gameContainerWidth = document.getElementById('cave-container').offsetWidth;
var gameContainerHeight = document.getElementById('cave-container').offsetWidth;
var gameWidth = gameContainerWidth >= gameContainerHeight ? gameContainerHeight : gameContainerWidth;
var tileWidth = (gameWidth - (gameWidth % caveSize)) / caveSize;
var Tiles;
(function (Tiles) {
    Tiles[Tiles["floor"] = 0] = "floor";
    Tiles[Tiles["wall"] = 1] = "wall";
})(Tiles || (Tiles = {}));
var cave = [];
var genInitialCave = function (cave) {
    for (var h = 0; h < caveSize; h++) {
        cave.push([]);
        for (var w = 0; w < caveSize; w++) {
            if (h === 0 || h === caveSize - 1 || w === 0 || w === caveSize - 1) {
                cave[h].push(Tiles.wall);
            }
            else {
                var pseudoRandom = Math.random();
                pseudoRandom > spaceFactor ? cave[h].push(Tiles.wall) : cave[h].push(Tiles.floor);
            }
        }
    }
    return cave;
};
var smoothCave = function (cave) {
    var caveClone = structuredClone(cave);
    for (var h = 0; h < caveSize; h++) {
        for (var w = 0; w < caveSize; w++) {
            if (h > 0 && h < caveSize - 1 && w > 0 && w < caveSize - 1) {
                var spaceCounter = 0;
                for (var oh = -1; oh <= 1; oh++) {
                    for (var wh = -1; wh <= 1; wh++) {
                        var offseth = h + oh;
                        var offsetw = w + wh;
                        if (!(offseth === h && offsetw === w)) {
                            if (caveClone[offseth][offsetw] === Tiles.floor)
                                spaceCounter++;
                        }
                    }
                }
                if (spaceCounter > 4) {
                    cave[h][w] = Tiles.floor;
                }
                else if (spaceCounter < 4) {
                    cave[h][w] = Tiles.wall;
                }
            }
        }
    }
    return cave;
};
// Function to render the cave
function renderCave(cave, containerId) {
    // Get the container element
    var container = document.getElementById(containerId);
    if (!container) {
        console.error("Element with ID '".concat(containerId, "' not found."));
        return;
    }
    // Set container styles to position divs properly
    container.style.gridTemplateColumns = "repeat(".concat(caveSize, ", ").concat(tileWidth, "px)");
    container.style.gridAutoRows = "".concat(tileWidth, "px");
    // Clear any existing content
    container.innerHTML = '';
    // Iterate through the 2D array and create divs
    cave.forEach(function (row) {
        row.forEach(function (caveTile) {
            // Create a new div element
            var tile = document.createElement('div');
            tile.id = caveTile === Tiles.floor ? "tile-floor" : "tile-wall";
            tile.style.width = "".concat(tileWidth, "px");
            tile.style.height = "".concat(tileWidth, "px");
            // Append the tile to the container
            container.appendChild(tile);
        });
    });
}
var generateCave = function () {
    cave = [];
    genInitialCave(cave);
    for (var i = 0; i < 5; i++) {
        console.log("checking in a " + i + " by " + (i) + " area");
        cave = smoothCave(cave);
    }
    renderCave(cave, 'generated-cave');
};
document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('generate-cave');
    console.log("button found", JSON.stringify(button));
    if (!button) {
        console.error("Button with ID 'generate-cave' not found.");
        return;
    }
    button.addEventListener('click', function () {
        console.log('Generate Cave button clicked');
        generateCave();
    });
});
