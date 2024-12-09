// import * as fs from 'fs';

const caveSize: number = 100

const spaceFactor: number = 0.55

const gameContainerWidth: number = document.getElementById('cave-container')!.offsetWidth
const gameContainerHeight: number = document.getElementById('cave-container')!.offsetWidth
const gameWidth: number = gameContainerWidth >= gameContainerHeight ? gameContainerHeight : gameContainerWidth
const tileWidth: number = (gameWidth - (gameWidth % caveSize)) / caveSize


enum Tiles {
    floor = 0,
    wall = 1
}

let cave: number[][] = []

const genInitialCave = (cave: number[][]): number[][] => {
    for (let h = 0; h < caveSize; h++) {
        cave.push([])
        for (let w = 0; w < caveSize; w++) {
            if (h === 0 || h === caveSize - 1 || w === 0 || w === caveSize - 1) {
                cave[h].push(Tiles.wall)
            } else {
                const pseudoRandom: number = Math.random()
                pseudoRandom > spaceFactor ? cave[h].push(Tiles.wall) : cave[h].push(Tiles.floor)
            }
        }      
    }
    return cave
}

const smoothCave = (cave: number[][]): number[][] => {
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
                            if (caveClone[offseth][offsetw] === Tiles.floor)
                                spaceCounter++
                        }
                    }
                }
                if (spaceCounter > 4) {
                    cave[h][w] = Tiles.floor
                } else if (spaceCounter < 4) {
                    cave[h][w] = Tiles.wall
                }
            }
        }      
    }
    return cave
}

// Function to render the cave
function renderCave(cave: number[][], containerId: string) {
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
    cave.forEach(row => {
        row.forEach(caveTile => {
            // Create a new div element

            const tile = document.createElement('div');
            tile.id = caveTile === Tiles.floor ? "tile-floor" : "tile-wall"
            tile.style.width = `${tileWidth}px`
            tile.style.height = `${tileWidth}px`
            // Append the tile to the container
            container.appendChild(tile);
        });
    });
}

const generateCave = () => {
    cave = []
    genInitialCave(cave)
    for (let i = 0; i < 5; i++) {
        cave = smoothCave(cave)
    }
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
