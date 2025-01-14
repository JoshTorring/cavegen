const caveSize: number = 200

const spaceFactor: number = 0.53

const caveContainerWidth: number = document.getElementById('cave-container')!.clientWidth
const caveContainerHeight: number = document.getElementById('cave-container')!.clientHeight
const gameWidth: number = caveContainerWidth >= caveContainerHeight ? caveContainerHeight : caveContainerWidth
const tileWidth: number = (gameWidth - (gameWidth % caveSize)) / caveSize

enum Tiles {
    floor = 0,
    wall = 1
}

enum Colour {
    floor = 0xa38a7f,
    wall = 0x423b37,
    enemy = 0xff00ff
}

let cave: (number | string)[][][] = []

const genInitialCave = (cave: (string | number)[][][]): (number | string)[][][] => {
    for (let h = 0; h < caveSize; h++) {
        cave.push([])
        for (let w = 0; w < caveSize; w++) {
            cave[h].push([])
            if (h === 0 || h === caveSize - 1 || w === 0 || w === caveSize - 1) {
                cave[h][w].push(Tiles.wall)
                cave[h][w].push(Colour.wall)
            } else {
                const pseudoRandom: number = Math.random()
                pseudoRandom > spaceFactor ? cave[h][w].push(Tiles.wall) : cave[h][w].push(Tiles.floor)
                pseudoRandom > spaceFactor ? cave[h][w].push(Colour.wall) : cave[h][w].push(Colour.floor)
            }
        }      
    }
    return cave
}

const smoothCave = (cave: (number | string)[][][]): (number | string)[][][] => {
    let caveClone = structuredClone(cave)
    for (let h = 0; h < caveSize; h++) {
        for (let w = 0; w < caveSize; w++) {
            if (h > 0 && h < caveSize - 1 && w > 0 && w < caveSize - 1) {
                let spaceCounter: number = 0
                for (let oh = -1; oh <= 1; oh++) {
                    for (let wh = -1; wh <= 1; wh++) {
                        const offseth: number = h + oh
                        const offsetw: number = w + wh
                        if (!(offseth === h && offsetw === w)) {
                            if (caveClone[offseth][offsetw][0] === Tiles.floor)
                                spaceCounter++
                        }
                    }
                }
                if (spaceCounter > 4) {
                    cave[h][w][0] = Tiles.floor
                } else if (spaceCounter < 4) {
                    cave[h][w][0] = Tiles.wall
                }
            }
        }      
    }
    return cave
}

// Function to render the cave
function renderCave(cave: (number | string)[][][], containerId: string) {
    // Get the container element
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Element with ID '${containerId}' not found.`);
        return;
    }

    // Set container styles to position divs properly
    container.style.gridTemplateColumns = `repeat(${caveSize}, ${tileWidth}px)`;
    container.style.gridAutoRows = `${tileWidth}px`;

    // Clear any existing content
    container.innerHTML = '';

    // Iterate through the 2D array and create divs
    cave.forEach((row, h) => {
        row.forEach((caveTile, w) => {
            // Create a new div element
            const tile = document.createElement('div');
            tile.id = caveTile[0] === Tiles.floor ? "tile-floor" : "tile-wall"
            tile.style.width = `${tileWidth}px`
            tile.style.height = `${tileWidth}px`
            tile.style.backgroundColor = `#${cave[h][w][1].toString(16).toUpperCase()}`
            // Append the tile to the container
            container.appendChild(tile);
        });
    });
}

const colourTiles = (cave: (number | string)[][][]) => {
    cave.forEach((row, h) => {
        row.forEach((tile, w) => {
            let notCurrentTileCounter: number = 0
            if (h > 1 && h < caveSize - 2 && w > 1 && w < caveSize - 2) {
                for (let oh = -2; oh <= 2; oh++) {
                    for (let wh = -2; wh <= 2; wh++) {
                        const offseth: number = h + oh
                        const offsetw: number = w + wh
                        if (!(offseth === h && offsetw === w)) {
                            if (cave[offseth][offsetw][0] !== cave[h][w][0])
                                notCurrentTileCounter++
                        }
                    }
                }
                tileColourSwitcher(tile, h, w, notCurrentTileCounter, 25)
            } else if (h > 0 && h < caveSize - 1 && w > 0 && w < caveSize - 1) {
                for (let oh = -1; oh <= 1; oh++) {
                    for (let wh = -1; wh <= 1; wh++) {
                        const offseth: number = h + oh
                        const offsetw: number = w + wh
                        if (!(offseth === h && offsetw === w)) {
                            if (cave[offseth][offsetw][0] !== cave[h][w][0])
                                notCurrentTileCounter++
                        }
                    }
                }
                tileColourSwitcher(tile, h, w, notCurrentTileCounter, 9)
            }
        })
    });
}

const tileColourSwitcher = (tile: (number | string)[], h: number, w: number, notCurrentTileCounter: number, areaChecked: number) => {
    switch (tile[0]) {
        case (Tiles.floor):
            adjustColour(cave, h, w, Colour.floor, notCurrentTileCounter, areaChecked)
            break;
        case (Tiles.wall):
            adjustColour(cave, h, w, Colour.wall, notCurrentTileCounter, areaChecked)
            break;
        default:
            break;
    }
}

const adjustColour = (cave: (number | string)[][][], h:number, w:number, colour: number, numberOfNotSameTiles: number, areaChecked: number) => {
    const colourEffectIntesnsity: number = 2
    const colourHex: string = colour.toString(16)
    const rgb:string[] = [colourHex.slice(0, 2), colourHex.slice(2, 4), colourHex.slice(4, 6)]
    const newrgb: string[] = rgb.map(splitColour => {
        return (Math.floor(parseInt(splitColour, 16) * (1 - (numberOfNotSameTiles / ((areaChecked - 1) * colourEffectIntesnsity))))).toString(16)
    });
    const newColour = newrgb.join("")
    cave[h][w][1] = parseInt(newColour, 16)
}

const generateCave = () => {
    cave = []
    genInitialCave(cave)
    for (let i = 0; i < 10; i++) {
        cave = smoothCave(cave)
    }
    colourTiles(cave)
    renderCave(cave, 'generated-cave');
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('generate-cave');
    console.log("button found", JSON.stringify(button))

    if (!button) {
        console.error("Button with ID 'generate-cave' not found.");
        return;
    }

    button.addEventListener('click', () => {
        console.log('Generate Cave button clicked');
        generateCave(); 
    });
});
